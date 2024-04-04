import {ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import InputField from '../components/InputField';
import Icons from '../utils/Icons';
import { signin } from '../Services/auth';
import { authContext } from '../Contexts/AuthContext';
import Loader from '../components/Loader';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { borderColor } from '../Constants/colors';
import { useDispatch } from 'react-redux';
import { fetchDetails } from '../Slices/userDetails';
import { useNetInfo } from '@react-native-community/netinfo';



export default function SignIn({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPssword] = useState('');

  const {isLoggedIn,setIsLoggedIn} = useContext(authContext)
  const [isLoading,setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const {type,isConnected} = useNetInfo()


  useEffect(() =>{
    if(isConnected === false){
        Snackbar.show({
            text:"No internet connection",
            backgroundColor:"red",
            
        })
    }
  },[isConnected])

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      dispatch(fetchDetails())
    } catch (error) {
      Snackbar.show({
        text:"Some error occurred",
        backgroundColor:"red"
      })
    }
  };

  const handleSignIn = () => {


    if(!email){
      Snackbar.show({
        text:"Email is required",
        backgroundColor:"red"
      })

      return 
    }
    if(!password){
      Snackbar.show({
        text:"password is required",
        backgroundColor:"red"
      })
      return
    }

    if(password.length < 4 || password.length > 20){
      Snackbar.show({
        text:"password length must be between 4-8 characters",
        backgroundColor:"red"
      })

      return 
    }

    setIsLoading(true)

    signin(email.trim(),password.trim()).then((res) =>{
        if(res.data.success){
            // navigation.navigate("home")
            console.log(res.data.user)
            storeData("user_data",res.data.user)
            setIsLoading(false)
            setIsLoggedIn(true)
        }
    }).catch((err) => {
        setIsLoading(false)
        Snackbar.show({
            text:"Invalid email or password",
            backgroundColor:"red"
        })
        console.log(err)
    })
  }


if(isLoading){
    return <Loader />
}

  return (
    <SafeAreaView style={styles.main}>
        <View style={styles.icon}>
           <Icons name={"person-circle-outline"} category={"Ionicons"} size={150}/>
        </View>
        <TouchableOpacity style={styles.SignIn} onPress={() => navigation.navigate("signup")} >
            <Text>Do't have an account? Signup now </Text>
        </TouchableOpacity>
        <View style={styles.container}>
          <InputField
            key={"mail"}
            iconName={'mail'}
            placeholder={'Enter your mail'}
            val={email}
            setValue={setEmail}
          />
          <InputField
            key={"password"}
            iconName={'key'}
            placeholder={'Enter your password'}
            val={password}
            setValue={setPssword}
          />
        </View>
        <View style={styles.forgotPassword}>
          <TouchableOpacity onPress={() => navigation.navigate("Forgot Password")}>
            <Text>Forgot Passowrd ?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btnSignUp} onPress={handleSignIn}>
            <Text>Signin</Text>
        </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    container:{
        width:"100%",
        paddingVertical:10,
        // marginVertical:15
    },
    btnSignUp:{
        borderWidth:2,
        borderColor:borderColor,
        paddingHorizontal:25,
        paddingVertical:10,
        borderRadius:10,
        marginVertical:15
    },
    icon:{
        padding:15
    },
    SignIn:{
        marginVertical:20,
        paddingVertical:10
    },
    forgotPassword:{
      
      width:"80%",
      alignItems:"flex-end"
    }
});
