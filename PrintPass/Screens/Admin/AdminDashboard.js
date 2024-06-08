import { View, Text } from 'react-native'
import React from 'react'

const AdminDashboard = ({navigation}) => {
  return (
    <View className="justify-center mx-10 flex-1 gap-10 px-20">
      <Text onPress={() => navigation.navigate("StudentRegisterScreen")}>Register Student</Text>
      <Text onPress={() => navigation.replace("SessionScreen")}>Add Sessions</Text>
      <Text onPress={() => navigation.replace("ReportGeneratorScreen")}>Generate Reports</Text>
    </View>
  )
}

export default AdminDashboard