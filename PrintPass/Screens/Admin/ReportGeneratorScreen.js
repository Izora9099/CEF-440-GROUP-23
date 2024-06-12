import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Dimensions, Image, ScrollView, StatusBar } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { firestore } from '../../Firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import images from '../../constants/images';

const { width: screenWidth } = Dimensions.get('window');

const ReportGeneratorScreen = ({ navigation }) => {
  const [course, setCourse] = useState('');
  const [sessionTime, setSessionTime] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [reportData, setReportData] = useState(null);
  const [courseName, setCourseName] = useState('');

  const generateReport = async () => {
    if (!course || !sessionTime || !timestamp) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    try {
      const attendancesRef = collection(firestore, 'attendances');
      const attendanceQuery = query(
        attendancesRef,
        where('courseCode', '==', course)
      );

      const snapshot = await getDocs(attendanceQuery);
      const data = [];
      const inputDate = timestamp.split('-').reverse().join('-');

      snapshot.forEach(doc => {
        const attendance = doc.data();
        const attendanceDate = attendance.date.split(' ')[0].split('-').reverse().join('-');
        
        if (attendanceDate === inputDate && attendance.time === sessionTime) {
          data.push([attendance.studentName, attendance.matricule, attendance.date]);
        }
      });

      if (data.length > 0) {
        setReportData(data);
      } else {
        Alert.alert('No Records Found', 'No matching records found for the provided inputs.');
        setReportData(null);
      }

      // Fetch course name
      const coursesRef = collection(firestore, 'courses');
      const courseQuery = query(coursesRef, where('courseCode', '==', course));
      const courseSnapshot = await getDocs(courseQuery);

      if (!courseSnapshot.empty) {
        const courseDoc = courseSnapshot.docs[0];
        setCourseName(courseDoc.data().courseName);
      } else {
        setCourseName('');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while fetching the report.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={{ height: 20, width: 20 }}>
            <Image source={images.left_arrow} style={{ height: '100%', width: '100%', tintColor: '#1E90FF' }} />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerText}>Report Generator</Text>
        <View />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={{ textAlign: 'center', marginTop: 10, marginBottom: 20 }}>Enter data to generate the attendance report</Text>
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
              placeholder="Session Time (h:00 am/pm - h:00 am/pm)"
              value={sessionTime}
              onChangeText={setSessionTime}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Timestamp (day-month-year)"
              value={timestamp}
              onChangeText={setTimestamp}
            />
          </View>
          <TouchableOpacity style={styles.generateButton} onPress={generateReport}>
            <Text style={styles.generateButtonText}>Generate Report</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.reportContainer}>
          {reportData ? (
            <>
              <View style={styles.reportHeader}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Attendance Report for {course} on {timestamp} at period {sessionTime}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                  <View style={{ height: 25, width: 25 }}>
                    <Image source={images.student} style={{ height: '100%', width: '100%', tintColor: '#1E90FF' }} />
                  </View>
                  <Text style={{ fontWeight: 'bold' }}>{reportData.length} students were present</Text>
                </View>
              </View>

              <Table borderStyle={{ borderWidth: 1 }}>
                <Row
                  data={['Names', 'Matricule', 'Date']}
                  style={styles.head}
                  textStyle={styles.text}
                />
                <Rows
                  data={reportData}
                  textStyle={styles.text}
                />
              </Table>
            </>
          ) : (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image source={images.report} style={{ width: '100%', height: 350, paddingTop: 10 }} resizeMode="contain" />
            </View>
          )}
        </View>

        <View style={styles.exportOptions}>
          <TouchableOpacity>
            <View style={{ height: 30, width: 30 }}>
              <Image source={images.pdf} style={{ height: '100%', width: '100%' }} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={{ height: 30, width: 30 }}>
              <Image source={images.excel} style={{ height: '100%', width: '100%' }} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={{ height: 30, width: 30 }}>
              <Image source={images.documents} style={{ height: '100%', width: '100%' }} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={{ height: 30, width: 30 }}>
              <Image source={images.share} style={{ height: '100%', width: '100%' }} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingTop: 80, // Add padding to account for the fixed header
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    paddingTop:40,
    backgroundColor: '#f5f5f5',
    width: '100%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 10, // Ensure the header is on top
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  formContainer: {
    marginBottom: 20,
    paddingHorizontal: 15,
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
    marginTop: 5,
    padding: 15,
    borderRadius: 5,
    width: '100%',
    height: 300,
    marginBottom: 4,
  },
  reportHeader: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 8,
    width: screenWidth - 32,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    gap: 10,
  },
  exportOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    marginBottom: 20,
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  text: {
    margin: 6,
    textAlign: 'center',
  },
});

export default ReportGeneratorScreen;
