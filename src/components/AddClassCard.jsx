import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { bgColor, borderColor } from '../Constants/colors'
import { BlurView } from '@react-native-community/blur'
import InputField from './InputField'
import Icons from '../utils/Icons'
import { useDispatch, useSelector } from 'react-redux'
import { addClass } from '../Slices/classesSlice'
import Snackbar from 'react-native-snackbar'
import { addClassToDb } from '../Services/database'
import Loader from './Loader'

export default function AddClassCard({display,setDisplay}) {

  const dispatch = useDispatch()
  const [isLoading,setIsLoading] = useState(false)
  const userDetails = useSelector((state) => state.user.details)
  const classes = useSelector((state) => state.clas.classes)
  const [className,setClassName] = useState("")

  const handleAddClass = () => {
    
    if(!className){
      Snackbar.show({
        text:"classname required",
        backgroundColor:"red"
      })

      return 
    }

    setDisplay(false)
    setIsLoading(true)
    addClassToDb(className.trim(),userDetails._id).then((res) => {
      if(res.data.success){ 
        dispatch(addClass({data:res.data.clas}))
        setIsLoading(false)
        Snackbar.show({
          text:"class created successfully",
          backgroundColor:"green"
        })
        
        setClassName("")
      }

    }).catch((error) => {
      console.log(error),
      setIsLoading(false)
      Snackbar.show({
        text:"some error occurred",
        backgroundColor:"red"
      })
    })
   
  }

  if(isLoading){
    return <View style={styles.container}><Loader /></View>
  }
  return (
    <>
    {
      display &&
      <View style={styles.container}>
        <TouchableOpacity style={styles.btnClose} onPress={() => setDisplay(false)}>
          <Icons name={"close"} category={"AntDesign"} size={30} />
        </TouchableOpacity>
        <InputField placeholder={"Enter Classname"} iconName={"edit"} iconSize={25} val={className} setValue={setClassName}/>
        <TouchableOpacity style={styles.btnAdd} onPress={handleAddClass}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
    }
    </>
  )
}

const styles = StyleSheet.create({
  container:{
    height:300,
    width:"100%",
    backgroundColor:"black",
    position:"absolute",
    top:"30%",
    shadowColor:"white",
    elevation:10,
    borderRadius:10,
    borderWidth:2,
    borderColor:borderColor,
    // display:"none",
    alignItems:"center",
    justifyContent:"center",
    gap:20
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