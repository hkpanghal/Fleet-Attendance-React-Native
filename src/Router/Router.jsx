import React, { useContext, useEffect, useState } from 'react'
import { DarkTheme, NavigationContainer } from '@react-navigation/native'

import AuthContext, { authContext } from '../Contexts/AuthContext'
import AppStack from './AppStack'
import AuthStack from './AuthStack'
import Loader from '../components/Loader'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store } from '../Store/store.js'
import { fetchDetails } from '../Slices/userDetails.js'
const Router = () => {

  const isLoading = useSelector((state) => state.user.isLoading)
  const {isLoggedIn,setIsLoggedIn} = useContext(authContext)
  const isLoggedin = useSelector((state) => state.user.isLoggedIn)
  const user_details = useSelector((state) => state.user.details)
  const dispatch = useDispatch()


useEffect(() => {
  dispatch(fetchDetails())
 
},[])

useEffect(() => {
  if(isLoggedin){
    setIsLoggedIn(isLoggedin)
    // console.log(user_details)
  }
},[isLoading])


if(isLoading){
  return <Loader />
}

    return (
 
       <NavigationContainer theme={DarkTheme}>
          {isLoggedIn ? <AppStack/> : <AuthStack />}
      </NavigationContainer>

    )
}

export default Router