import { StyleSheet, Text, View } from 'react-native'
import { Slot , SplashScreen, Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import { useEffect, React } from 'react'

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(()=>{
    if(error) throw error

    if(fontsLoaded) SplashScreen.hideAsync();

  },[fontsLoaded, error])

  if(!fontsLoaded) return null;

  return (
    <Stack>
        <Stack.Screen name="index" options={{headerShown:true, title:"Home"}}/>
        <Stack.Screen name="profile" options={{headerShown:true, title: "Profile"}}/>
    </Stack>
  )
}

export default RootLayout