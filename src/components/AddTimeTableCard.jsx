import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import InputField from './InputField'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { borderColor } from '../Constants/colors';
import { useDispatch } from 'react-redux';
import { addTimeTable } from '../Slices/timeTableSlice';

export default function AddTimeTableCard({display,setDisplay}) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [timeTo, setTimeTo] = useState("");
    const [timeFrom, setTimeFrom] = useState("");
    const [clicked, setClicked] = useState("");
    const [title,setTitle] = useState("")
    const [subject,setSubject] =  useState("")
    const dispatch = useDispatch()
    
    const handlePickedTime = (time) => {
        const date = new Date(time);
        
        const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
         
        clicked === "from"? setTimeFrom(formattedTime) : setTimeTo(formattedTime) 
        setDatePickerVisibility(false)

    }

   const handleAddTT = () => {
    dispatch(addTimeTable({_id:Date.now(),title,subject,timeFrom,timeTo}))
    setDisplay(false)
   }
  return (

    display &&
    <View  style={styles.container}>

        <InputField placeholder={"Enter title"} val={title} setValue={setTitle}/>
        <InputField placeholder={"Enter subject"} val={subject} setValue={setSubject} />
        <View style={styles.timeInfoContainer} >
            <View style={styles.timeInfoDetailsContainer}>
                <TouchableOpacity style={styles.btnContainer} onPress={() => (setClicked("from"),setDatePickerVisibility(true))}>
                    <Text>From</Text>
                </TouchableOpacity >
                <Text style={{borderBottomWidth:2,borderColor:borderColor}} >{timeFrom}</Text>
            </View>
            <View style={styles.timeInfoDetailsContainer}>
                <TouchableOpacity style={styles.btnContainer} onPress={() => (setClicked("to"),setDatePickerVisibility(true))}>
                    <Text>To</Text>
                </TouchableOpacity>
                <Text style={{borderBottomWidth:2,borderColor:borderColor}}>{timeTo}</Text>
            </View>
        </View>
        <TouchableOpacity style={styles.btnContainer} onPress={handleAddTT}>
            <Text>Add</Text>
        </TouchableOpacity>
        <DateTimePicker 
        mode='time'
        locale='en'
        isVisible={isDatePickerVisible}
        onCancel={() => setDatePickerVisibility(false)}
        onConfirm={handlePickedTime}
        
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        height:350,
        width:"100%",
        backgroundColor:"black",
        position:"absolute",
        top:"30%",
        shadowColor:"white",
        elevation:10,
        borderRadius:10,
        borderWidth:2,
        borderColor:borderColor,
        alignItems:"center",
        justifyContent:"center",
        gap:20,
        zIndex:100,
        flexWrap:"nowrap"
    },
    timeInfoContainer:{
        flexDirection:"row",
        width:"75%",
        paddingHorizontal:15,
        justifyContent:"space-between"
    },
    btnContainer:{
        paddingVertical:10,
        paddingHorizontal:20,
        borderWidth:2,
        borderColor:borderColor,
        borderRadius:10
    },
    timeInfoDetailsContainer:{
        alignItems:"center",
        justifyContent:"center",
        gap:10
    }
})