import { Client, Account, ID, Avatars, Databases, Query} from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.aora',
    projectId: "66d9911c002b2a777a80",
    databaseId: "66d9937500254c807fb1",
    userCollectionId: "66d993bd002c2b9cf3e4",
    videosCollectionId: "66d9941d0025a12443de",
    storageId: "66d99788001e2a8270b5"
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);


export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if(!newAccount) throw new Error;

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl,
              }
        );
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
}

export const signIn  = async (email, password) => {

    try {
      const session = await account.createEmailPasswordSession(email, password);
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
  }

//   export async function getAccount() {
//     try {
//       const currentAccount = await account.get();
  
//       return currentAccount;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }
  
  // Get Current User
  export const getCurrentUser =  async () => {

    try {
      const currentAccount = await account.get();
      if (!currentAccount) throw Error;
  
      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );
  
      if (!currentUser) throw Error;
  
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
  // Sign Out
  export async function signOut() {
    try {
      const session = await account.deleteSession("current");
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Upload File
  export async function uploadFile(file, type) {
    if (!file) return;
  
    const { mimeType, ...rest } = file;
    const asset = { type: mimeType, ...rest };
  
    try {
      const uploadedFile = await storage.createFile(
        appwriteConfig.storageId,
        ID.unique(),
        asset
      );
  
      const fileUrl = await getFilePreview(uploadedFile.$id, type);
      return fileUrl;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Get File Preview
  export async function getFilePreview(fileId, type) {
    let fileUrl;
  
    try {
      if (type === "video") {
        fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
      } else if (type === "image") {
        fileUrl = storage.getFilePreview(
          appwriteConfig.storageId,
          fileId,
          2000,
          2000,
          "top",
          100
        );
      } else {
        throw new Error("Invalid file type");
      }
  
      if (!fileUrl) throw Error;
  
      return fileUrl;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Create Video Post
  export async function createVideoPost(form) {
    try {
      const [thumbnailUrl, videoUrl] = await Promise.all([
        uploadFile(form.thumbnail, "image"),
        uploadFile(form.video, "video"),
      ]);
  
      const newPost = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.videosCollectionId,
        ID.unique(),
        {
          title: form.title,
          thumbnail: thumbnailUrl,
          video: videoUrl,
          prompt: form.prompt,
          creator: form.userId,
        }
      );
  
      return newPost;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Get all video Posts
  export const getAllPosts = async  () => {

    try {
      const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.videosCollectionId
      );
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Get video posts created by user
  export const getUserPosts =  async (userId) => {
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.videosCollectionId,
        [Query.equal("creator", userId)]
      );
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Get video posts that matches search query
  export async function searchPosts(query) {
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.videosCollectionId,
        [Query.search("title", query)]
      );
  
      if (!posts) throw new Error("Something went wrong");
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Get latest created video posts
  export async function getLatestPosts() {
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.videosCollectionId,
        [Query.orderDesc("$createdAt"), Query.limit(7)]
      );
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
  }
