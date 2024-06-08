import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Dimensions, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for icons
import Icon from 'react-native-vector-icons/Ionicons';
import images from '../../constants/images';
import { Feather } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const ReportGeneratorScreen = ({ navigation }) => {
  const [course, setCourse] = useState('');
  const [sessionTime, setSessionTime] = useState('');
  const [timestamp, setTimestamp] = useState('');

  const generateReport = () => {
    // Your logic for generating the report goes here
    // This is just a placeholder function
    Alert.alert('Report Generated', 'Attendance report will be displayed here.');
  };

  const { width: screenWidth } = Dimensions.get('window');

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#1E90FF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Report Generator</Text>
        <View />
        </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Course Code"
            value={course}
            onChangeText={setCourse}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Session Time"
            value={sessionTime}
            onChangeText={setSessionTime}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Timestamp"
            value={timestamp}
            onChangeText={setTimestamp}
          />
        </View>
        <TouchableOpacity style={styles.generateButton} onPress={generateReport}>
          <Text style={styles.generateButtonText}>Generate Report</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.reportContainer}>
        <View style={{  alignItems: 'center', justifyContent: 'center' }}>
          <Image source={images.report} style={{ width: '100%', height:350,paddingTop:10}} resizeMode="contain" />
        </View>
      </View>

      <View style={styles.exportOptions}>
        <TouchableOpacity style={styles.exportButton}>
        <FontAwesome name="file-pdf-o" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.exportButton}>
          <Ionicons name="document-text" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.exportButton}>
        <FontAwesome name="file-excel-o" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.exportButton}>
        <Feather name="share-2" size={24} color="black" />
        </TouchableOpacity>
      </View>

     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  header: { 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    width: '100%',
    paddingTop: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  formContainer: {
    marginBottom: 20,
    paddingHorizontal:15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: '#f2f2f2',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  generateButton: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  reportContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
    width:'100%',
    marginHorizontal:'12',
    height:300,
    marginBottom:10,
    
  },
  exportOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  exportButton: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  backButtonFooter: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ReportGeneratorScreen;
