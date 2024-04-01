import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { bgColor, borderColor } from '../Constants/colors'
import { authContext } from '../Contexts/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Snackbar from 'react-native-snackbar'
import { useSelector } from 'react-redux'
import Icons from '../utils/Icons'
import DefaultImage from "../assets/images/userDefaultImage.png"

export default function Profile() {

  const {isLoggedIn,setIsLoggedIn} = useContext(authContext)
  const userDetails = useSelector((state) => state.user.details)

  const handleLogOut = async() => {

    Alert.alert("Log Out","Are you sure ?",[
      {text:"OK",onPress:async () => {
        try {
          await AsyncStorage.removeItem("user_data");
          setIsLoggedIn(false)
          Snackbar.show({
            text:"logged out successfully"
          })
        } catch (error) {
          console.log('Error removing item from AsyncStorage:', error);
          Snackbar.show({
            text:"some error occurred"
          })
        }
      } },
      {text:"Cancel", onPress:() => {}}

    ],{cancelable:false})
   
  }
  return (
    <View style={styles.main}>

      <View style={styles.userImageContainer}>
         <Image source={DefaultImage} style={styles.userImage}/>
      </View>

      <View style={styles.userInfoContainer}>
        <Text style={{fontSize:25,textAlign:"center"}}>{userDetails.first_name + " " + userDetails.last_name}</Text>
        <Text style={{textAlign:"center"}}>{userDetails.email}</Text>
      </View>
      <TouchableOpacity style={styles.btnLogout} onPress={handleLogOut}>
       <View>
        <Icons name={"logout"} category={"AntDesign"} size={20} />
       </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  main:{
   flex:1,
   padding:15,
   position:"relative",
   alignItems:"center",
   justifyContent:"center",
   gap:10
  },
  
  btnLogout:{
    borderWidth:2,
    borderColor:borderColor,
    borderRadius:10,
    padding:15,
    width:100,
    justifyContent:"center",
    alignItems:"center",
    position:"absolute",
    bottom:30,
    right:20,
    
  },
  userImageContainer:{
    height:100,
    width:100,
  },
  userImage:{
    height:"100%",
    width:"100%"
  },
  userInfoContainer:{
    backgroundColor:bgColor,
    padding:15,
    borderRadius:10
  }

})