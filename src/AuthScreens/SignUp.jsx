import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import InputField from '../components/InputField'
import Icons from '../utils/Icons'
import Snackbar from 'react-native-snackbar'
import { signup } from '../Services/auth'
import { authContext } from '../Contexts/AuthContext'
import Loader from '../components/Loader'
import { borderColor } from '../Constants/colors'

export default function SignUp({navigation}) {
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")
  const {isLoggedIn,setIsLoggedIn} = useContext(authContext)
  
  const [isLoading,setIsLoading] = useState(false) 

  const handleSignUp = () => {
    if(!firstName || !email || !password || !confirmPassword){
      Snackbar.show({
        text:"*(required)   field must not be empty"
      })
      
      return 
    }
    
    
    if(password !== confirmPassword){
      Snackbar.show({
        text:"confirm password did not match"
      })
      return
    }
    else if(password.length < 4 || password.length > 20){
      Snackbar.show({
        text:"password length must be between 4-20 characters"
      })
      return
    }
    
    
    // console.log(firstName,lastName,email,password,confirmPassword)


    setIsLoading(true)

    signup(firstName.trim(),lastName.trim(),email.trim(),password.trim(),confirmPassword.trim()).then((res) => {
      if(res.data.success){
        setIsLoading(false)
        navigation.navigate("signin")
      }
    }).catch(error => {
      console.log(error)
      setIsLoading(false)
      Snackbar.show({
        text:"some error occurred while creating the user please try again"
      })
    })

  }

  if(isLoading){
    return <Loader />
  }
  return (
    <SafeAreaView style={styles.main}>

       <View style={styles.icon}>
           <Icons name={"person-circle-outline"} category={"Ionicons"} size={100}/>
        </View>
        <TouchableOpacity style={styles.SignIn} onPress={() => navigation.navigate("signin")} >
            <Text>Already have an account? Signin now </Text>
        </TouchableOpacity>
   
      <View style={styles.container}>
        <InputField key={"firstName"} iconName={"user"} placeholder={"Enter First Name   *(required)"} val={firstName} setValue={setFirstName}/> 
        <InputField key={"lastName"} iconName={"user"} placeholder={"Enter Last Name   (optional)"} val={lastName} setValue={setLastName}/> 
        <InputField key={"mail"} iconName={"mail"} placeholder={"Enter Your Mail    *(required)"} val={email} setValue={setEmail}/> 
        <InputField key={"password"} iconName={"key"} placeholder={"Enter Your Password  *(required)"} val={password} setValue={setPassword}/> 
        <InputField key={"confirmPassword"} iconName={"key"} placeholder={"Confirm Password    *(required)"} val={confirmPassword} setValue={setConfirmPassword}/> 
      </View>

      <TouchableOpacity style={styles.btnSignUp} onPress={handleSignUp}>
        <Text>Signup</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    gap:20
  },
  btnSignUp:{
    borderWidth:2,
    borderColor:borderColor,
    paddingHorizontal:25,
    paddingVertical:10,
    borderRadius:10,
    marginVertical:15
  },
  container:{
    width:"100%"
  }
})