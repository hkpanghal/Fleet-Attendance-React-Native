import { StyleSheet, Text, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import React from 'react'

export default function Icons({category,name,size}) {
  
    switch (category) {
        case "AntDesign":
            return <AntDesign name={name} size={size ?? 34}/>
            break;
        case "Ionicons":
            return <Ionicons name={name} size={size ?? 34}/>
            break;
    
        case "EvilIcons":
        return <EvilIcons name={name} size={size ?? 34}/>
        break;
        
        case "FontAwesome":
        return <FontAwesome name={name} size={size ?? 34}/>
        break;
        case "Entypo":
        return <Entypo name={name} size={size ?? 34}/>
        break;

        default:
            break;
    }
}

const styles = StyleSheet.create({})