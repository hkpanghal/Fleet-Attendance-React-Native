import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { fetchAttendances } from '../Slices/attendanceSlice'
import { useRoute } from '@react-navigation/native'
import SnapComp from '../components/SnapComp'

export default function SnapShot() {
    const {class_id,user_id,class_name} = useRoute().params 
    const dispatch = useDispatch()
    const historyData = useSelector((state) => state.attendance.data)
    const isLoading = useSelector((state) => state.attendance.isLoading)


    useEffect(() => {
        dispatch(fetchAttendances({class_id,user_id}))
    },[])

    if(isLoading){
        return <Loader />
    }

  return (
    <SafeAreaView style={styles.main}>
        <FlatList showsVerticalScrollIndicator={false} keyExtractor={(elem) => elem._id} data={historyData} renderItem={(elem) => <SnapComp elem={elem.item}/>}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main:{
    flex:1,
    paddingHorizontal:10,
    justifyContent:"center"
  }
})