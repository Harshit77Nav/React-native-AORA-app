import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React,{useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput.jsx';
import Trending from '../../components/Trending.jsx';
import EmptyState from '../../components/EmptyState.jsx';import { getAllPosts, getLatestPosts } from '../../lib/appwrite.js';
import useAppwrite from '../../lib/useAppwrite.js';
import VideoCard from '../../components/VideoCard.jsx';

const Home = () => {  
  const {data:posts, refetch} = useAppwrite(getAllPosts)
  const {data:latestPost} = useAppwrite(getLatestPosts)

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async() => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false)
  }
  console.log(posts);
  
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>(
          <VideoCard video={item}/>
        )}
        ListHeaderComponent={()=>(
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text> 
                <Text className="text-2xl font-psemibold text-white">
                  Harshit
                </Text>
              </View>
              <View className="mt-1.5">
                  <Image source={images.logoSmall} className="w-9 h-10"
                  resizeMode='contain' />
              </View>
            </View>
            <SearchInput />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">Latest Videos
              </Text>
              <Trending posts={latestPost??[]} />
            </View>
          </View>
        )}
        ListEmptyComponent={()=>(
          <EmptyState 
          title="No Videos Found"
          subtitle="Upload one" />
        )}
        refreshControl={<RefreshControl 
        refreshing = {refreshing}
        onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

export default Home