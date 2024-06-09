import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, Dimensions, Animated, Easing, ActivityIndicator, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { firestore } from '../../Firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'; // Import query and where
import * as LocalAuthentication from 'expo-local-authentication';
import * as Crypto from 'expo-crypto';
import images from '../../constants/images';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const TakeAttendanceScreen = () => {
  const [showClosingSession, setShowClosingSession] = useState(false);
  const [uniqueIdentifier, setUniqueIdentifier] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [attendanceData, setAttendanceData] = useState({});
  const navigation = useNavigation();
  const route = useRoute();
  const { courseCode, courseName, day, time } = route.params;
  const lineAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(lineAnimation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      })
    ).start();
  }, [lineAnimation]);

  useEffect(() => {
    if (isModalVisible) {
      // Clear text input when modal is visible
      setUniqueIdentifier('');
    }
  }, [isModalVisible]);

  const translateY = lineAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-115, 100],
  });

  const handleFingerprintAuthentication = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate with fingerprint',
      });

      if (result.success) {
        const hashedIdentifier = await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256,
          uniqueIdentifier
        );

        const studentsSnapshot = await getDocs(collection(firestore, 'students'));
        let studentMatch = null;

        studentsSnapshot.forEach(doc => {
          const studentData = doc.data();
          if (studentData.hashedUniqueIdentifier === hashedIdentifier) {
            studentMatch = studentData;
          }
        });

        if (studentMatch) {
          const currentDate = new Date();
          const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;
          const attendanceQuery = query(
            collection(firestore, 'attendances'),
            where('studentName', '==', studentMatch.name),
            where('courseCode', '==', courseCode),
            where('date', '==', formattedDate)
          );

          const attendanceSnapshot = await getDocs(attendanceQuery);

          if (attendanceSnapshot.empty) {
            const attendanceRecord = {
              studentName: studentMatch.name,
              courseCode: courseCode,
              courseName: courseName,
              day: day,
              time: time,
              date: formattedDate
            };

            await addDoc(collection(firestore, 'attendances'), attendanceRecord);

            setAttendanceData(attendanceRecord);
            setIsModalVisible(true);
          } else {
            Alert.alert('Duplicate Entry', `${studentMatch.name}, your attendance has already been taken.`);
          }
        } else {
          Alert.alert('Error', 'Authentication failed. Please check your unique identifier and try again.');
        }
      } else {
        Alert.alert('Error', 'Fingerprint authentication failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred during fingerprint authentication.');
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <View style={{height:20, width:20,}}>
               <Image source={images.left_arrow} style={{height:'100%', width:'100%',tintColor: '#1E90FF' }}/>
            </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mark Attendance</Text>
      </View>

      {!showClosingSession ? (
        <>
          <View style={styles.box}>
            <View style={styles.courseRow}>
              <Text style={styles.font}>{courseCode}-</Text>
              <Text style={styles.font}>{courseName}</Text>
            </View>
            <View style={styles.timeRow}>
              <View style={styles.timeItem}>
                <View style={styles.iconContainer}>
                  <Image source={images.calendar} style={styles.icon} />
                </View>
                <Text style={styles.timeText}>{day}</Text>
              </View>
              <View style={styles.timeItem}>
                <View style={styles.iconContainer}>
                  <Image source={images.clock} style={styles.icon} />
                </View>
                <Text style={styles.timeText}>{time}</Text>
              </View>
            </View>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Enter Unique Identifier"
            value={uniqueIdentifier}
            onChangeText={setUniqueIdentifier}
          />

          <TouchableOpacity style={styles.fingerprintContainer} onPress={handleFingerprintAuthentication}>
            <Image source={images.fingerprint_scanner} style={[styles.fingerprintImage, { tintColor: '#1E90FF' }]} />
            <Animated.View style={[styles.animatedLine, { transform: [{ translateY }] }]} />
          </TouchableOpacity>

          <View style={styles.instructionContainer}>
            <Text style={styles.instructionText}>Place registered finger on scanner</Text>
          </View>

          <Modal visible={isModalVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Attendance Taken ✅</Text>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                  <Text style={styles.modalTextBold}>{attendanceData.studentName}</Text>
                  <Text style={styles.modalText}>Your attendance has been taken</Text>
                </View>
                <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                  <Text style={styles.modalButtonText}> OK </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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
    marginLeft: '6%',
    marginTop: '5%',
    borderRadius: 10,
    width: '90%',
    height: 150,
    gap: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    gap: -5,
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
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
  },
  timeText: {
    fontSize: 15,
    color: '#fff',
  },
  input: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#f2f2f2',
    alignSelf: 'center',
  },
  fingerprintContainer: {
    width: 200,
    height: 200,
    marginTop: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color:'#1E90FF'
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalTextBold: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  modalButton: {
    backgroundColor: '#1E90FF',
    padding: 10,
    paddingHorizontal:20,
    borderRadius: 10,
    marginTop: 15,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
