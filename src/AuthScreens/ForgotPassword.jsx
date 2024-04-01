import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import Icons from '../utils/Icons'
import InputField from '../components/InputField'
import Snackbar from 'react-native-snackbar'
import { borderColor } from '../Constants/colors'
import { forgotPassword } from '../Services/auth'
import Loader from '../components/Loader'


export default function ForgotPassword({navigation}) {

    const [email,setEmail] = useState("")
    const [isLoading,setIsLoading] = useState(false)

    const handleForgotPassword = () => {
 
        if(!email){
            Snackbar.show({
                text:"Email must not be empty"
            })
            return
        }

        setIsLoading(true)
        forgotPassword(email.trim())
        .then((res) => {
            console.log(res.data)
            setIsLoading(false)
            if(res.data.success){
                Snackbar.show({
                    text:res.data.msg
                })
               navigation.navigate("Reset Password")
            }
        })
        .catch((err) => {
            setIsLoading(false)
            console.log(err)
            Snackbar.show({
                text:"some error occurred"
            })
        })
    
    }

    if(isLoading){
        return <Loader />
    }
    
  return (
    <View style={styles.main}>
      <Icons name={"user"} category={"AntDesign"} size={54}/>
      <InputField iconName={"mail"} placeholder={"Enter your mail"} val={email} setValue={setEmail}/>
      <TouchableOpacity style={styles.btnVerify} onPress={() => handleForgotPassword()}>
        <Text>Verify</Text>
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
    btnVerify:{
        paddingHorizontal:20,
        paddingVertical:10,
        borderWidth:2,
        borderColor:borderColor,
        borderRadius:10
    }
})