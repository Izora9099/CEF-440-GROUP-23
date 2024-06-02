import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import images from '../../constants/images';
import { AntDesign } from '@expo/vector-icons';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleLoginPress = () => {
    // Handle login logic here
  };

  return (
   
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Image source={images.login_pic} style={{width:'100%', height:'45%'}}/>
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
        <TouchableOpacity onPress={() => navigation.navigate("SessionScreen")} style={styles.loginBtn}>
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
    backgroundColor:'#ffff'
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
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  mode_pic: {
    height:320,
    width: '80%',
  }
});

export default LoginScreen;