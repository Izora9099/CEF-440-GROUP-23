import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as LocalAuthentication from 'expo-local-authentication';
import { firestore } from '../../Firebase';  // Ensure the correct path to your firebase.js
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import images from '../../constants/images';

const StudentRegisterScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [matricule, setMatricule] = useState('');
  const [fingerprintData, setFingerprintData] = useState(false);

  const handleFingerprintRegistration = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (hasHardware && isEnrolled) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Authenticate with fingerprint',
        });

        if (result.success) {
          Alert.alert("Fingerprint Registration", "Fingerprint registered successfully!");
          setFingerprintData(true);
        } else {
          Alert.alert("Fingerprint Registration", "Fingerprint registration failed. Please try again.");
        }
      } else {
        Alert.alert("Fingerprint Registration", "Your device does not support fingerprint authentication.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Fingerprint Registration", "An error occurred during fingerprint registration.");
    }
  };

  const handleRegister = async () => {
    if (name.trim() === '' || matricule.trim() === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await addDoc(collection(firestore, 'students'), { // Add data directly using addDoc
        name: name,
        matricule: matricule,
        fingerprintData: fingerprintData,
      });
      Alert.alert('Success', 'Student registered successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error registering student: ', error);
      Alert.alert('Error', 'Failed to register student');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={images.register} style={{ width: '100%', height: '45%' }} />
      <Text style={styles.title}>Register Student</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Matricule"
          value={matricule}
          onChangeText={setMatricule}
        />
        <TouchableOpacity style={styles.fingerprintContainer} onPress={handleFingerprintRegistration}>
          <Image source={images.fingerprint_scanner} style={styles.fingerprintImage} />
          <Text style={styles.fingerprintText}>
            {fingerprintData ? "Fingerprint Registered" : "Register Fingerprint"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StudentRegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#1E90FF',
    top: '40%',
    marginLeft: '20%',
    position: 'absolute',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#f2f2f2',
  },
  fingerprintContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  fingerprintImage: {
    width: 100,
    height: 100,
    tintColor: '#1E90FF',
  },
  fingerprintText: {
    marginTop: 10,
    fontSize: 16,
    color: '#1E90FF',
  },
  registerButton: {
    width: '80%',
    backgroundColor: '#1E90FF',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
