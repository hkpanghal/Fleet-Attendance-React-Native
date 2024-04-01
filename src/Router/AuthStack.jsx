import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useContext } from 'react'
import SignIn from '../AuthScreens/SignIn'
import SignUp from '../AuthScreens/SignUp'
import Home from '../Screens/Home'
import { bgColor } from '../Constants/colors'
import ForgotPassword from '../AuthScreens/ForgotPassword'
import ResetPassword from '../AuthScreens/ResetPassword'


const stack = createNativeStackNavigator()

export default function AuthStack() {

  return (
    <stack.Navigator screenOptions={{headerStyle:{backgroundColor:bgColor},headerTitleAlign:"center"}} >
        <stack.Screen name='signin' component={SignIn} />
        <stack.Screen name='signup' component={SignUp}/>
        <stack.Screen name='Forgot Password' component={ForgotPassword}/>
        <stack.Screen name='Reset Password' component={ResetPassword}/>
    </stack.Navigator>
  )
}
