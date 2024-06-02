import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import images from '../../constants/images';

const StudentRegisterScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [matricule, setMatricule] = useState('');
  const [fingerprintRegistered, setFingerprintRegistered] = useState(false);

  const handleFingerprintRegistration = () => {
    // Placeholder for fingerprint registration logic
    // This should be replaced with the actual logic to register a fingerprint
    Alert.alert("Fingerprint Registration", "Fingerprint registered successfully!");
    setFingerprintRegistered(true);
  };

  const handleRegister = () => {
    // Placeholder for registration logic
    // This should be replaced with the actual logic to handle the registration
    Alert.alert("Registration", "Registration successful!");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#1E90FF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Register</Text>
      </View>
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
            {fingerprintRegistered ? "Fingerprint Registered" : "Register Fingerprint"}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#f5f5f5',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingTop: StatusBar.currentHeight,
  },
  backButton: {
    position: 'absolute',
    left: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E90FF',
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
    borderColor: '#1E90FF',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
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
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
