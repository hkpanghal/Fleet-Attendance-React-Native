import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icons from '../utils/Icons'
import AddTimeTableCard from '../components/AddTimeTableCard'
import { useSelector } from 'react-redux'
import TimeTableComp from '../components/TimeTableComp'

export default function TimeTable() {

  const [addttDisplay,setaddttDisplay] = useState(false)
  const data = useSelector(state => state.timetable.data)
  // const handleAddTimeTable = () => {
  
  //   Alert.alert('Enter Your Name','Please enter your name:',)
  //   // Alert.prompt(
  //   //   'Enter Your Name',
  //   //   'Please enter your name:',
  //   //   (text) => console.log('You entered: ' + text),
  //   //   'plain-text',
  //   //   'John Doe'
  //   // );
  // }

  // console.log(data)



  return (
    <View style={styles.main}>


      <FlatList  data={data} keyExtractor={(item) => item._id} renderItem={(elem) => <TimeTableComp elem={elem.item} /> } />

      <TouchableOpacity style={styles.btnAddTimeTable} onPress={() => setaddttDisplay(true)}>
        <Icons name={"add-circle-sharp"} category={"Ionicons"} size={50}/>
      </TouchableOpacity>
      <AddTimeTableCard display={addttDisplay} setDisplay={setaddttDisplay} />

    </View>
  )
}

const styles = StyleSheet.create({
  main:{
    flex:1,
    position:"relative",
    paddingHorizontal:10,
    alignItems:"center"
   
  },
  btnAddTimeTable:{
    position:"absolute",
    right:40,
    bottom:50
  }
})