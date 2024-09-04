import { Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Link } from 'expo-router'

const App = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-red-800 text-3xl" >Aora!</Text>
      <StatusBar style='auto'/>
      <Link href={'/profile'}>Go to profile</Link>
    </View>
  )
}

export default App