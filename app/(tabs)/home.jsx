import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React,{useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput.jsx';
import Trending from '../../components/Trending.jsx';
import EmptyState from '../../components/EmptyState.jsx';import { getAllPosts } from '../../lib/appwrite.js';
;

const Home = () => {

  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] =  useState(false);
  
  useEffect(() => {
    const fetchData = async () =>{
      setIsLoading(true)
      try {
        const res = await getAllPosts();
        setData(res);

      } catch (error) {
        Alert.alert("Error",error.message)

      }  finally {
        setIsLoading(false)

      }
    }
    fetchData();
  }, [])
  console.log(data); 
  

  const onRefresh = async => {
    setRefreshing(true);
    //
    setRefreshing(false)
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={[{id:1},{id:2},{id:3}]}
        // data={[]}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>(
          <Text className="text-white text-3xl">
            {item.id}
          </Text>
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
              <Trending posts={[{id:1},{id:2},{id:3}]??[]} />
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