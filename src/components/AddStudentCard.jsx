import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { borderColor } from '../Constants/colors'
import Icons from '../utils/Icons'
import InputField from './InputField'
import { useRoute } from '@react-navigation/native'
import Snackbar from 'react-native-snackbar'
import { addStudentToDb } from '../Services/database'
import { addStudent } from '../Slices/studentsSlice'
import { useDispatch } from 'react-redux'
import Loader from './Loader'
import { addelemStudentArray } from '../Slices/classesSlice'


export default function AddStudentCard({display,setDisplay}) {

    const [studentFirstName,setstudentFirstName] = useState("")
    const [studentLastName,setstudentLastName] = useState("")
    const [studentRollNumber,setStudentRollNumber] = useState("")
    const [isLoading,setIsLoading] = useState(false)

    const dispatch = useDispatch()

    const {class_id,user_id} = useRoute().params

    const handleAddStudent = () => {
        if(!studentFirstName || !studentRollNumber){
            Snackbar.show({
                text:"*(required) fields must not be empty"
            })
            return
        }

        setIsLoading(true)

        addStudentToDb(class_id,user_id,studentFirstName,studentLastName,studentRollNumber)
        .then((res) => {
            if(res.data.success){
                dispatch(addStudent({data:res.data.student}))
                dispatch(addelemStudentArray({class_id:res.data.student.class_belongs,student_id:res.data.student._id}))
                setIsLoading(false)
                setstudentFirstName("")
                setStudentRollNumber("")
                setstudentLastName("")
                Snackbar.show({
                    text:"student created successfully"
                })
            }

        })
        .catch(err => {
            setIsLoading(false)
            Snackbar.show({
                text:"some error occurred while creating the student"
            })
            console.log(err)
        })

    }


    if(isLoading){
        return <View style={styles.container} ><Loader/></View>
    }
  return (

      <>
    {
      display &&
      <View style={styles.container}>
        <TouchableOpacity style={styles.btnClose} onPress={() => setDisplay(false)}>
          <Icons name={"close"} category={"AntDesign"} size={30} />
        </TouchableOpacity>
        <InputField placeholder={"Enter First Name (*required)"} iconName={"edit"} iconSize={25} val={studentFirstName} setValue={setstudentFirstName}/>
        <InputField placeholder={"Enter Last Name (*optional)"} iconName={"edit"} iconSize={25} val={studentLastName} setValue={setstudentLastName}/>
        <InputField placeholder={"Enter Roll Number (*required)"} iconName={"edit"} iconSize={25} val={studentRollNumber} setValue={setStudentRollNumber}/>
        <TouchableOpacity style={styles.btnAdd} onPress={handleAddStudent} >
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
    }
    </>
 )
}

const styles = StyleSheet.create({
    container:{
        height:350,
        width:"100%",
        backgroundColor:"black",
        position:"absolute",
        top:"30%",
        shadowColor:"white",
        elevation:10,
        borderRadius:10,
        borderWidth:2,
        borderColor:borderColor,
        alignItems:"center",
        justifyContent:"center",
        gap:20,
        zIndex:100,
        flexWrap:"nowrap"
      },
      btnAdd:{
        borderWidth:2,
        borderColor:borderColor,
        paddingHorizontal:35,
        paddingVertical:11,
        borderRadius:10
      },
    
      btnClose:{
        backgroundColor:"red",
        borderRadius:100,
        position:"absolute",
        right:10,
        top:10,
       
      }
})