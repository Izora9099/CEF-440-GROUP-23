import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Button, Animated } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Dots from 'react-native-dots-pagination';
import { useNavigation } from '@react-navigation/native';
import images from '../constants/images';

const { width: screenWidth } = Dimensions.get('window');

const onboardingData = [
  {
    title: 'Welcome',
    description: 'Welcome to our awesome app!',
    image: images.welcome,
    color: '#fff',
  },
  {
    title: 'Discover',
    description: 'Have a good attendance marking experience',
    image: images.working,
    color: '#fff',
  },
  {
    title: 'Get Started',
    description: 'Get started with using the app today!',
    image: images.touch,
    color: '#fff',
  },
];

const IntroScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => (
    <View style={[styles.slide, { backgroundColor: item.color }]}>
     {index === onboardingData.length - 1 && (
        <Text onPress={() => navigation.navigate('ModeScreen')} className="right-[-45%] top-[-4%] text-[#1E90FF] text-[                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     20px]">Next</Text>
      )}
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
     
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={onboardingData}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        onSnapToItem={(index) => setActiveIndex(index)}
        useScrollView={true} // Enable smooth animation
      />
      <View style={styles.dotsContainer}>
        <Dots
          length={onboardingData.length}
          active={activeIndex}
          activeDotWidth={25}
          activeDotHeight={10}
          dotWidth={10}
          dotHeight={10}
          activeColor="#000"
          passiveColor="#ddd"
          passiveDotOpacity={0.3}
          paddingHorizontal={10}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 300,
    height: 400,
    marginBottom: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
  },
});

export default IntroScreen;
