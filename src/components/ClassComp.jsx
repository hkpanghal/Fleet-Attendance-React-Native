import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useDebugValue, useState } from 'react'
import { bgColor, borderColor } from '../Constants/colors'
import Icons from '../utils/Icons'
import { addClassToDb, updateClassNameToDb } from '../Services/database'
import Snackbar from 'react-native-snackbar'
import Loader from './Loader'
import { useDispatch } from 'react-redux'
import { renameClass } from '../Slices/classesSlice'

export default function ClassComp({elem,navigation}) {
  const [isEditable ,setIsEditable] = useState(false)
  const [className,setClassName] = useState(elem.class_name)
  const [isLoading,setIsLoading] = useState(false)
  
  const dispatch = useDispatch()

  const navigateTo = () => {
    navigation.navigate("Students",{class_id:elem._id,user_id:elem.created_by,class_name:elem.class_name})
  }

  const handleRenameClass = () => {
   
    setIsLoading(true)
    // console.log(elem._id,elem.created_by,className)
    updateClassNameToDb(elem._id,elem.created_by,className)
    .then((res) => {
      if(res.data.success){

        Snackbar.show({
          text:"Classname Updated Successfully"
        })

        dispatch(renameClass({class_id:elem._id,class_name:className}))
        setIsEditable(false)
        setIsLoading(false)
      }
    } )
    .catch(err => {
      console.log(err)
      Snackbar.show({
        text:"Some Error Occurred Please Try again!!"
      })
      setIsLoading(false)
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
    <View style={styles.container}  >
      <TouchableOpacity onPress={() => isEditable? handleRenameClass() : handleSetEditable()}>
       <Icons name={!isEditable ? "pencil" : "save" } category={ !isEditable?"EvilIcons":"AntDesign"} size={25}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.classInfo} onPress={navigateTo}>
        <TextInput value={className} readOnly={!isEditable} placeholderTextColor={"white"} style={[styles.classText,{borderColor:isEditable?"white":bgColor}]} onChangeText={(text) => setClassName(text) }/>
      </TouchableOpacity>
       <TouchableOpacity style={styles.btnStudent} onPress={navigateTo}>
         <Icons name={"users"} category={"FontAwesome"} />
         <Text>{elem.students.length}</Text>
       </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        padding:10,
        backgroundColor:bgColor,
        width:"100%",
        borderRadius:10,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginVertical:10,
        height:85
    },
    btnStudent:{
      justifyContent:"center",
      alignItems:"center",
      padding:10
    },
    classInfo:{
      // backgroundColor:"red",
      width:"70%",
      justifyContent:"center",
      alignItems:"center",
      height:"100%"
    },
    classText:{
      color:"white",
      fontSize:18,width:"100%",
      textAlign:"center",
      borderWidth:1,
      
    }
})

