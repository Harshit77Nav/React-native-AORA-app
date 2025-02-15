import { View, Text, Image } from 'react-native'
import React,{useState} from 'react'
import { icons } from '../constants'
import { TouchableOpacity } from 'react-native';

const VideoCard = ({video: {title, thumbnail, video,
     creator:{username, avatar}}}) => {
        const [play, setPlay] = useState(false);
  return (
    <View className="flex-col items-center px-4 mb-14">
        <View className="flex-row gap-3 items-start">
            <View className="justify-center items-center flex-row flex-1">
                <View className="w-[46px] h-[46px] rounded-lg border border-secondary 
                justify-center item-center p-0.5" >
                    <Image source={{uri: avatar}} className="w-full h-full rounded-lg "
                    resizeMode='cover' />
                </View>
                <View className="justify-center flex-1 ml-3 gap-y-1">
                    <Text className="text-white font-psemibold text-sm" numberOfLines={1}> 
                        {title}
                    </Text>
                    <Text className="text-sm text-gray-100 font-pregular" numberOfLines={1}>
                        {username}
                    </Text>
                </View>
            </View>
            <View className="pt-2 ">
                <Image source={icons.menu} className="w-5 h-5"
                resizeMode='contain'/>
            </View>
        </View>

        {play?(
            <Text className="text-white">
                playing
            </Text>
        ):(<TouchableOpacity
            activeOpacity={0.7}
            onPress={()=>setPlay(true)}
            className="w-full h-60 ronded-xl mt-3 relative flex justify-center items-center">
            <Image source={{uri: thumbnail}} className="w-full h-full rounded-xl mt-3"
            resizeMode='cover'/>
            <Image source={icons.play} 
            className="w-12 h-80 absolute" 
            resizeMode='contain'/>
        </TouchableOpacity>
        )}
    </View>
  )
}

export default VideoCard