import {Animated, Alert, StyleSheet, Text, TextInput, TouchableOpacity, Vibration, View, Easing } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Icons from '../utils/Icons'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { bgColor, borderColor } from '../Constants/colors'
import { deleteStudent, markIsPresent, updateStudent } from '../Slices/studentsSlice'
import { useDispatch } from 'react-redux'
import Snackbar from 'react-native-snackbar'
import Loader from './Loader'
import { deleteStudentFromDb, updateStudentDetailsToDb } from '../Services/database'
import { delelemStudentArray } from '../Slices/classesSlice'


export default function StudentComp({elem,index}) {

   
    const [isEditable,setIsEditable] = useState(false)
    const [studentName,setStudentName] = useState(elem.first_name + " " + elem.last_name)
    const [studentRollNumber,setStudentRollNumber] = useState(elem.roll_number)
    const [isLoading,setIsLoading]  = useState(false)
    // const [studentLastName,setstudentLastName] = useState(elem.last_name)
    const dispatch = useDispatch()

    const handleDeleteStudent = () =>{
        Vibration.vibrate(100);
        Alert.alert("Delete Student","Are you sure ?",
        [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'OK', onPress: () => {

                setIsLoading(true)
                deleteStudentFromDb(elem.class_belongs,elem._id)
                .then((res) => {
                    if(res.data.success){
                        dispatch(delelemStudentArray({class_id:res.data.student.class_belongs,student_id:res.data.student._id}))
                        dispatch(deleteStudent({student_id:res.data.student._id}))
                        setIsLoading(false)
                        Snackbar.show({
                            text:"Student Deleted SuccessFully",
                            backgroundColor:"green"
                        })
                    }
                })
                .catch((err) => {
                    console.log(err)
                    setIsLoading(false)
                    Snackbar.show({
                        text:"Some error occurred while deleting the student",
                        backgroundColor:"red"
                    })
                })
            }}
        ],{cancelable:true})
    }


    const handleMarkIsPresent = (value) =>{
        // console.log(elem)
        dispatch(markIsPresent({_id:elem._id,is_present:value,index:index}))
   }

   const handleUpdateStudent = () => {
        const data = studentName.split(" ").filter((elem) => elem.length > 0)
     
        if(data.length>0){
            const first_name = data[0]
            const last_name = ( data.length > 1 ? data.slice(1) : data[1])?.join(" ") ?? " "
            const details = {
                index,
                student_id:elem._id,
                first_name,
                last_name,
                roll_number:studentRollNumber
            }

            setIsLoading(true)
            updateStudentDetailsToDb(elem._id,elem.created_by,first_name,last_name,studentRollNumber)
            .then((res) => {
                if(res.data.success){
                    dispatch(updateStudent(details))
                    setIsLoading(false)
                    setIsEditable(false)
                    Snackbar.show({
                        text:"Details updated Successfully",
                        backgroundColor:"green"
                    })    
                }
            })
           .catch((err) => {
            console.log(err)
            setIsLoading(false)
            Snackbar.show({
                text:"Some error occurred while updating details please try again !!",
                backgroundColor:"red"
            })
           })

            return
        }

        Snackbar.show({
            text:"Student name and roll number must not be empty",
            backgroundColor:"red"
        })

    
   }

   const handleSetEditable = () => {
    
    Alert.alert("Editable","Do't forget to save",[
      {text:"OK",onPress:() => {setIsEditable(true)}},
      {text:"Cancel",onPress:() => {console.log("Cancel")}},
    ],{cancelable:false})
  }



  if(isLoading){
    return <Loader/>
  }
  return (
    <View style={[styles.container]}>
      
      <View style={styles.btnEditRemove}>
        <TouchableOpacity onPress={!isEditable? handleSetEditable : handleUpdateStudent}><Icons name={!isEditable?"pencil":"folder"} category={"Ionicons"} size={24}/></TouchableOpacity>
        <TouchableOpacity onPress={handleDeleteStudent}><Icons name={"close"} category={"AntDesign"} size={24}/></TouchableOpacity>
      </View>
      <View style={styles.studentInfoContainer}>
        <Icons name={"person-sharp"} category={"Ionicons"}/>
        <View>
             <TextInput style={[styles.textInput,{borderColor:isEditable ? "white" :borderColor}]} placeholder='' editable={isEditable} value={studentName}  onChangeText={(text) => setStudentName(text)} />

            <TextInput style={[styles.textInput,{borderColor:isEditable ? "white" :borderColor}]} placeholder='' editable={isEditable} value={studentRollNumber}  onChangeText={(text) => setStudentRollNumber(text)} />
        </View>
      </View>

      <View style={styles.containerCheckbox}>
        <View style={styles.minicontainerCheckbox}>
            <Text>P</Text>
            <BouncyCheckbox  isChecked={elem.is_present}  fillColor="green" onPress={() => handleMarkIsPresent(true)} disableBuiltInState/>
        </View>
        <View style={styles.minicontainerCheckbox}>
            <Text>A</Text>
            <BouncyCheckbox  isChecked={!elem.is_present} fillColor="red"  onPress={() => handleMarkIsPresent(false)} disableBuiltInState />
        </View>
      </View>
     
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        padding:10,
        justifyContent:"space-between",
        borderWidth:2,
        borderColor:borderColor,
        backgroundColor:bgColor,
        marginVertical:5,
        borderRadius:10,
        width:"100%"
    },
    containerCheckbox:{
        gap:10
    },
    minicontainerCheckbox:{
        // backgroundColor:"blue",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        gap:10
    },
    btnEditRemove:{
        justifyContent:"space-between"
    },
    textInput:{
        padding:0,
        margin:0,
        width:150,
        color:"white",
        // backgroundColor:"blue"
        borderWidth:1,

    },
    studentInfoContainer:{
        width:"65%",
        alignItems:"center",
        justifyContent:"space-evenly",
        flexDirection:"row",
        // gap:10,
        // backgroundColor:"red"
    }
})