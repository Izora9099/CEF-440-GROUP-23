import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../constants/global'
import images from '../constants/images'

const StarterScreen = ({navigation}) => {
  return (
    <View className="flex-1 items-center justify-center bg-[#ffff]">
      <Text style={styles.welcome}>PrintPass</Text>

      <Image
        source={images.phone}
      />
      <TouchableOpacity 
      onPress={() => navigation.navigate("IntroScreen")}
      style={styles.button}>
         <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

    </View>
  )
}

export default StarterScreen