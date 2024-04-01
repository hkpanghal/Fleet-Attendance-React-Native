import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icons from '../utils/Icons'

export default function TimeTable() {


  const handleAddTimeTable = () => {
  
    Alert.alert('Enter Your Name','Please enter your name:',)
    // Alert.prompt(
    //   'Enter Your Name',
    //   'Please enter your name:',
    //   (text) => console.log('You entered: ' + text),
    //   'plain-text',
    //   'John Doe'
    // );
  }

  return (
    <View style={styles.main}>


      <TouchableOpacity style={styles.btnAddTimeTable} onPress={handleAddTimeTable}>
        <Icons name={"add-circle-sharp"} category={"Ionicons"} size={50}/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  main:{
    flex:1,
    position:"relative"
  },
  btnAddTimeTable:{
    position:"absolute",
    right:40,
    bottom:50
  }
})