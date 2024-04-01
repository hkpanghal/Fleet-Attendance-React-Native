import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Loader() {
  return (
    <View style={styles.container}>
        <ActivityIndicator size={'large'} />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
       
    }
})