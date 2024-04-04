import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icons from '../utils/Icons'
import InputField from '../components/InputField'
import { resetPassword } from '../Services/auth'
import Snackbar from 'react-native-snackbar'
import Loader from '../components/Loader'
import { borderColor } from '../Constants/colors'
import { useNetInfo } from '@react-native-community/netinfo'

export default function ResetPassword({navigation}) {

    const [token,setToken] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [isLoading,setIsLoading] = useState(false)

    const {type,isConnected} = useNetInfo()


    useEffect(() =>{
      if(isConnected === false){
          Snackbar.show({
              text:"No internet connection",
              backgroundColor:"red",
              
          })
      }
    },[isConnected])

    const handleResetPassword = () => {

        if(!token){
            Snackbar.show({
                text:"token must not be empty",
                backgroundColor:"red"
            })
            return
        }

        if(!password || !confirmPassword){
            Snackbar.show({
                text:"password field is required",
                backgroundColor:"red"

            })
            return
        }
        if(password.length < 4 || password.length >20){
            Snackbar.show({
                text:"password length must be 4-20 characters",
                backgroundColor:"red"
            })
            return
        }
        if(password !== confirmPassword){
            Snackbar.show({
                text:"confirm password did not match",
                backgroundColor:"red"
            })
            return
        }


        setIsLoading(true)
        resetPassword(token.trim(),password.trim(),confirmPassword.trim())
        .then((res) => {
            setIsLoading(false)
            if(res.data.success){
                Snackbar.show({
                    text:res.data.msg,
                    backgroundColor:"red"
                })
                navigation.popToTop()
            }
        })
        .catch((err) => {
          
            console.log(err)
            setIsLoading(false)
            Snackbar.show({
                text:"token did not match",
                backgroundColor:"red"
            })
        })
    }

    if(isLoading){
        return <Loader />
    }


  return (
    <View style={styles.main}>
      <Icons name={"retweet"} category={"AntDesign"} size={54} />
      <View>
        <InputField iconName={"pushpin"} placeholder={"Enter token"} val={token} setValue={setToken}/>
        <InputField iconName={"key"} placeholder={"Enter new password"} val={password} setValue={setPassword}/>
        <InputField iconName={"key"} placeholder={"Confirm new password"} val={confirmPassword} setValue={setConfirmPassword}/>
      </View>
      <TouchableOpacity style={styles.btnReset} onPress={handleResetPassword}>
        <Text>Reset</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        gap:20
    },
    btnReset:{
        paddingHorizontal:20,
        paddingVertical:10,
        borderWidth:2,
        borderColor:borderColor,
        borderRadius:10 
    }
})