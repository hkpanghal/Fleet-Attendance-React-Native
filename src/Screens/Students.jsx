import { FlatList, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { bgColor, borderColor } from '../Constants/colors'
import InputField from '../components/InputField'
import StudentComp from '../components/StudentComp'
import Icons from '../utils/Icons'
import AddStudentCard from '../components/AddStudentCard'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { fetchStudents, switchIsPresent } from '../Slices/studentsSlice'
import { generateAttendancePDF, generatePDF } from '../utils/AttendancePDF'
import Snackbar from 'react-native-snackbar'
import { addAttendanceToDb } from '../Services/database'

export default function Students() {
    const {class_id,user_id,class_name} = useRoute().params 
    const [subject,SetSubject] = useState("")

    let students = useSelector((state) => state.student.students)
    let students1  = [...students]
     students1.sort((a,b) => a.roll_number>b.roll_number ? 1 :-1)
    students = [...students1]
    const isLoading = useSelector((state) => state.student.isLoading)
    const dispatch = useDispatch()
    const [displayAddStudentCard,setDisplayAddStudentCard] = useState(false)



    const handlePDFDownload = () => {

      if(!subject){
        Snackbar.show({
          text:"subject field is empty"
        })
        return
      }
      
      const date = new Date().toLocaleDateString()
      console.log(date)
      generatePDF(students,class_name,subject,date)
    }

    
 
    const handleCreateAttendance = () => {

      if(!subject){
        Snackbar.show({
          text:"subject field is empty"
        })
        return
      }

      
      addAttendanceToDb(class_id,user_id,students,subject)
      .then((res) => {
        if(res.data.success){
          Snackbar.show({
            text:"Attendance Saved Successfully"
          })
        }
      })
      .catch((err) => {
        console.log(err)
        Snackbar.show({
          text:"Some err occurred while saving attendance please try again !!"
        })
      })
    }

    useEffect(() => {
      const data = {class_id,user_id}
      dispatch(fetchStudents(data))

    },[])
    

    if(isLoading){
      return <Loader />
    }



    
    const renderFooter = () => (
        <>
        
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.headerCell}><Icons name={"smile-o"} category={"FontAwesome"} size={24}/></Text>
            <Text style={styles.headerCell}>Present</Text>
            <Text style={styles.headerCell}>{(students.filter((student)=>student.is_present === true)).length}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.headerCell}><Icons name={"emoji-sad"} category={"Entypo"}  size={20} /></Text>
            <Text style={styles.headerCell}>Absent</Text>
            <Text style={styles.headerCell}>{(students.filter((student)=>student.is_present === false)).length}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.headerCell}><Icons name={"hand-o-right"} category={"FontAwesome"} size={24} /></Text>
            <Text style={styles.headerCell}>Total</Text>
            <Text style={styles.headerCell}>{students.length}</Text>
          </View>
    
      </View>
      
      <View style={styles.btnBottomContainer}>
        <TouchableOpacity style={styles.btnBottom} onPress={handleCreateAttendance}><Text>Save</Text></TouchableOpacity>
        <TouchableOpacity style={styles.btnBottom} onPress={handlePDFDownload}><Text>PDF</Text></TouchableOpacity>
      </View>
        
        </>
    );

  return (
    <View style={styles.main}>
      <AddStudentCard display={displayAddStudentCard} setDisplay={(setDisplayAddStudentCard)}/>

      <View style={styles.topContainer}>
        <View style={styles.box}>
          <Text>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' })}</Text>
        </View>
        <View style={styles.box}>
         <View style={{flexDirection:"row",gap:10}}>
          <TouchableOpacity style={styles.btnSwitch} onPress={() => dispatch(switchIsPresent({is_present:true}))}><Text>P</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btnSwitch} onPress={() => dispatch(switchIsPresent({is_present:false}))}><Text>A</Text></TouchableOpacity>
         </View>
        </View>
        <View style={styles.box}>
          <InputField iconName={"book"} iconSize={20} placeholder={"Enter Subject"} val={subject} setValue={SetSubject}/>
        </View>
        <TouchableOpacity style={styles.box} onPress={() => setDisplayAddStudentCard(true)}>
          <Icons name={"person-add"} category={"Ionicons"} />
        </TouchableOpacity>
       
      </View>

      <FlatList keyExtractor={(item) => item._id} data={students} renderItem={(elem) => <StudentComp elem={elem.item} index={elem.index} />} showsVerticalScrollIndicator={false} ListFooterComponent={students.length && renderFooter}/>
      
    </View>
  )
}



const styles = StyleSheet.create({
  main:{
    flex:1,
    paddingHorizontal:15,
    position:"relative",
    alignItems:"center",
    gap:10
  },
  topContainer:{
    // backgroundColor:"red",
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"space-between"
  },
  box:{
    height:70,
    width:"48%",
    borderWidth:2,
    borderColor:borderColor,
    marginTop:10,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:20,
    backgroundColor:bgColor
  },
  btnSwitch:{
    backgroundColor:"black",
    padding:10,
    height:50,
    width:50,
    borderRadius:100,
    alignItems:"center",
    justifyContent:"center",
    borderWidth:1,
    borderColor:"#dadada"
  },
  btnBottomContainer:{
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    width:"100%"
  },
  btnBottom:{
    borderWidth:2,
    borderColor:borderColor,
    paddingHorizontal:20,
    paddingVertical:10,
    marginVertical:10,
    borderRadius:10
  },
  table: {
    borderWidth: 1,
    marginVertical: 20,
    backgroundColor:bgColor
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  headerCell: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent:"center",
    alignItems:"center"
  },
  
})