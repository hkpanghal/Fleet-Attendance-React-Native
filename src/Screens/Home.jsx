import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { bgColor, borderColor } from '../Constants/colors';
import defaultUserImage from "../assets/images/userDefaultImage.png"
import { flatListDatata } from '../Constants/home';
import HomeComps from '../components/HomeComps';
import { useSelector } from 'react-redux';



export default function Home({navigation}) {
 
  const userDetails = useSelector((state) => state.user.details)
  
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.userInfo}>
        <View style={styles.userInfoRight}>
          <Text numberOfLines={1} style={{fontSize:30,fontWeight:"700"}}>Welcome !!</Text>
          <Text numberOfLines={1} style={{fontSize:20,fontWeight:"700"}}>{userDetails.first_name +" " + userDetails.last_name}</Text>
          <Text numberOfLines={1} style={{}}>Email: {userDetails.email}</Text>
        </View>
        <View >
          <Image source={defaultUserImage} style={styles.userImage}/>
        </View>
      </View>
      <FlatList  numColumns={2}  keyExtractor={(elem)=> elem.id} data={flatListDatata} renderItem={(elem) => <HomeComps elem={elem.item} navigation={navigation}/>} />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main:{
    flex:1,
    alignItems:"center",
    padding:15
  },
  userInfo:{
    borderWidth:2,
    borderColor:borderColor,
    paddingVertical:15,
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    marginVertical:20,
    marginHorizontal:10,
    backgroundColor:bgColor,
    borderRadius:20,
    width:"100%",
   
  },
  userImage:{
    height:75,
    width:75
  },
  userInfoRight:{
    gap:5,
    padding:5
  },

})