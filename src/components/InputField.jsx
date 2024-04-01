import { StyleSheet, Text, TextInput, Vibration, View } from 'react-native'
import React from 'react'
import Icons from '../utils/Icons'




export default function InputField({placeholder,iconName,iconSize,val,setValue}) {
  return (
    <View style={styles.container}>
        <Icons category={"AntDesign"} name={iconName} size={iconSize}/>
        <TextInput style={styles.input} placeholder={placeholder} value={val}  onChangeText={(text) => setValue(text)}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:10,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        gap:10,
    
    },
    input:{
        borderBottomWidth:2,
        borderColor:"#222",
      
        width:"75%",
       
    }
})