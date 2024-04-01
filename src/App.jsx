import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AuthContext from './Contexts/AuthContext'
import Router from './Router/Router'
import { Provider } from 'react-redux'
import { store } from './Store/store'

const App = () => {

  return (
    <>
    <StatusBar backgroundColor={"#222"} />
    <AuthContext>
       <Provider store={store}>
        <Router />

       </Provider>
    </AuthContext>
    </>
  )
}

export default App

