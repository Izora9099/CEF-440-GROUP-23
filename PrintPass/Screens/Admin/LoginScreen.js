import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { firestore } from '../../Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import images from '../../constants/images';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleLoginPress = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password.');
      return;
    }

    try {
      const adminCollection = collection(firestore, 'admin');
      const q = query(adminCollection, where('username', '==', username), where('password', '==', password));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        console.log('Login Successful')
        navigation.replace('AdminDashboard'); 
      } else {
        Alert.alert('Invalid Entry', 'Username or password is incorrect.');
      }
    } catch (error) {
      console.error('Error logging in: ', error);
      Alert.alert('Error', 'An error occurred while trying to log in.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Image source={images.login_pic} style={{ width: '100%', height: '45%' }} />
      <View style={styles.inputView}>
        <View style={styles.iconContainer}>
          <AntDesign name="user" size={20} color="gray" />
        </View>
        <TextInput
          style={styles.inputText}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          onChangeText={handleUsernameChange}
        />
      </View>
      <View style={styles.inputView}>
        <View style={styles.iconContainer}>
          <AntDesign name="lock" size={20} color="gray" />
        </View>
        <TextInput
          style={styles.inputText}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#003f5c"
          onChangeText={handlePasswordChange}
        />
      </View>
      <TouchableOpacity onPress={handleLoginPress} style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffff'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#1E90FF',
    marginBottom: 10,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#f2f2f2',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  inputText: {
    flex: 1,
    height: 50,
    color: '#000',
    paddingLeft: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#1E90FF',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
