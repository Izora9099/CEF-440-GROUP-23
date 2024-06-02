import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, Dimensions, Animated, Easing, ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook
import images from '../constants/images';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const TakeAttendanceScreen = () => {
  const [showClosingSession, setShowClosingSession] = useState(false);
  const navigation = useNavigation(); // Get the navigation object
  const lineAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(lineAnimation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.inOut(Easing.ease), // Use Easing.inOut for ease-in-out effect
        useNativeDriver: true,
      })
    ).start();
  }, [lineAnimation]);

  const translateY = lineAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-110, 100],
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Left Arrow Icon */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#1E90FF" />
        </TouchableOpacity>
        {/* Title */}
        <Text style={styles.headerTitle}>Mark Attendance</Text>
      </View>

      {!showClosingSession ? (
        <>
          {/** course and time display */}
          <View style={styles.box}>
            {/** course */}
            <View style={styles.courseRow}>
              <Text style={styles.font}>CEF440-</Text>
              <Text style={styles.font}>Internet Programming</Text>
            </View>
            <View style={styles.timeRow}>
              <View style={styles.timeItem}>
                <View style={styles.iconContainer}>
                  <Image source={images.calendar} style={styles.icon} />
                </View>
                <Text style={styles.timeText}>Monday</Text>
              </View>
              <View style={styles.timeItem}>
                <View style={styles.iconContainer}>
                  <Image source={images.clock} style={styles.icon} />
                </View>
                <Text style={styles.timeText}>7am - 9am</Text>
              </View>
            </View>
          </View>
          {/** course and time display */}

          {/** fingerprint scanner */}
          <View style={styles.fingerprintContainer}>
            <Image source={images.fingerprint_scanner} style={[styles.fingerprintImage, { tintColor: '#1E90FF' }]} />
            <Animated.View style={[styles.animatedLine, { transform: [{ translateY }] }]} />
          </View>

          {/** instruction */}
          <View style={styles.instructionContainer}>
            <Text style={styles.instructionText}>Place registered finger on scanner</Text>
          </View>
        </>
      ) : (
        <View style={styles.closingSessionContainer}>
          <View style={{ height: "60%", width: screenWidth - 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red' }}>
            <Image source={images.error} style={{ width: '100%', height: '100%' }} />
          </View>
          <ActivityIndicator size={100} color="#1E90FF" />
          <Text style={styles.closingSessionText}>Closing session...</Text>
        </View>
      )}
    </View>
  );
};

export default TakeAttendanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight + 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  backButton: {
    position: 'absolute',
    left: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: "#1E90FF",
    padding: 15,
    margin: 10,
    marginLeft:'6%',
    marginTop:'5%',
    borderRadius: 10,
    width: '90%',
    height: 150,
    gap: 15,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadow for Android
    elevation: 5,
  },
  courseRow: {
    flexDirection: 'row',
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  timeItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 5,
  },
  icon: {
    width: 50,
    height: 50,
  },
  font: {
    fontSize: 19,
    fontWeight: '800',
    color: '#fff',
  },
  timeText: {
    fontSize: 18,
    color: '#fff',
  },
  fingerprintContainer: {
    width: 200,
    height: 200,
    marginTop: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:'20%'
  },
  fingerprintImage: {
    width: '100%',
    height: '100%',
  },
  animatedLine: {
    position: 'absolute',
    width: '80%',
    height: 2,
    backgroundColor: '#1E90FF',
  },
  instructionContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 16,
    color: '#000',
  },
  closingSessionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closingSessionText: {
    fontSize: 16,
    marginTop: 10,
    color: '#1E90FF',
  },
});
