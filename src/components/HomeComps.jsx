import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icons from '../utils/Icons'
import { bgColor } from '../Constants/colors'

export default function HomeComps({elem,navigation}) {
  
  return (
    <TouchableOpacity style={styles.comp} onPress={() => navigation.navigate(elem.nav)}>
        <Icons name={elem.icon.name} category={elem.icon.category} size={elem.icon.size}/>
        <Text style={{fontSize:20}}>{elem.name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    comp:{
        backgroundColor:bgColor,
        // margin:20,
        marginHorizontal:"2.5%",
        marginVertical:15,
        borderRadius:20,
        height:130,
        width:"45%",
        justifyContent:"center",
        alignItems:"center",
        gap:10
    },
    comp_special:{
        backgroundColor:bgColor,
      
        marginVertical:15,
        borderRadius:20,
        height:125,
        width:190,
        // backgroundColor:"red",
        justifyContent:"center",
        alignItems:"center",
        gap:10
    }
})