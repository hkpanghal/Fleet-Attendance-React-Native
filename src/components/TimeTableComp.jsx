import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { bgColor, borderColor } from '../Constants/colors'
import { TriggerType } from '@notifee/react-native';
import notifee from '@notifee/react-native';

export default function TimeTableComp({elem}) {


  async function onDisplayNotification() {
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    
    const [timeStr, period] = elem.timeFrom.split(' ');
    const [hours, minutes] = timeStr.split(':');
  
    // Create a date object representing today
    const currentDate = new Date();
  
    // Set the time to the specified time
    const notificationTime = new Date();
    notificationTime.setHours(parseInt(hours));
    notificationTime.setMinutes(parseInt(minutes));
    notificationTime.setSeconds(0);
    notificationTime.setMilliseconds(0);
  
    // If the period is PM and hours are less than 12, add 12 hours
    if (period === 'PM' && parseInt(hours) < 12) {
      notificationTime.setHours(notificationTime.getHours() + 12);
    }
  
    // If the notification time is already past, schedule it for the next day
    if (notificationTime < currentDate) {
      notificationTime.setDate(notificationTime.getDate() + 1);
    }
  
    // Calculate the timestamp for the notification time
    const timestamp = notificationTime.getTime();

   
    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp:timestamp, // fire at 11:10am (10 minutes before meeting)
    };


    // Display a notification
      await notifee.createTriggerNotification(
        {
          title: `Class Timing`,
          body: `${elem.title}\n ${elem.timeFrom} - ${elem.timeTo} `,
          android: {
            channelId
          },
        },
        trigger,
      );
    
  }
 
  useEffect(() => {
    onDisplayNotification()
  },[])
  return (
    <TouchableOpacity onPress={onDisplayNotification}>
      <View style={styles.container}>
      <Text>{elem.title}</Text>
      <Text>{elem.subject}</Text>
      <Text>{elem.timeFrom} - {elem.timeTo}</Text>
     
    </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        padding:10,
        justifyContent:"space-between",
        borderWidth:2,
        borderColor:borderColor,
        backgroundColor:bgColor,
        marginVertical:5,
        borderRadius:10,
        width:"100%"  
    }
})