import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { bgColor } from '../Constants/colors'
import Icons from '../utils/Icons'



export default function HistoryComp({elem,navigation,index}) {
    const [isEditable ,setIsEditable] = useState(false)


    console.log(elem)

    const handleNavigation = () => {
      navigation.navigate("Snapshots",{class_id:elem._id,user_id:elem.created_by,class_name:elem.class_name})
    }
    return (
      <TouchableOpacity style={styles.container} onPress={handleNavigation}>
        <Text>{index+1}</Text>
        <Text numberOfLines={1} style={{fontSize:20,width:"60%",textAlign:"center"}}>{elem.class_name}</Text>
         <TouchableOpacity style={styles.btnStudent} >
           <Icons name={"history"} category={"FontAwesome"} />
        
         </TouchableOpacity>
      </TouchableOpacity>

      
    )
  }
  
  const styles = StyleSheet.create({
      container:{
          padding:10,
          backgroundColor:bgColor,
          width:"100%",
          borderRadius:10,
          flexDirection:"row",
          justifyContent:"space-between",
          alignItems:"center",
          marginVertical:10
      },
      btnStudent:{
        justifyContent:"center",
        alignItems:"center",
        padding:10
      }
  })