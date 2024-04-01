import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { bgColor, borderColor } from '../Constants/colors'
import Accordion from 'react-native-collapsible/Accordion';
import Collapsible from 'react-native-collapsible';


export default function SnapComp({elem}) {
 
  const [activeSections, setActiveSections] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const presents = elem.students.filter((student) => student.is_present )
  const absents = elem.students.filter((student) => student.is_present === false)
 
  const dateTime = new Date(elem.createdAt);

  let hours = dateTime.getHours();
  const amPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert 0 to 12-hour format

  const formattedDateTime = `${dateTime.getFullYear()}/${(dateTime.getMonth() + 1).toString().padStart(2, '0')}/${dateTime.getDate().toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${dateTime.getMinutes().toString().padStart(2, '0')}:${dateTime.getSeconds().toString().padStart(2, '0')} ${amPm}`;

  const sections = [
    { title: 'Present', content: presents },
    { title: 'Absent', content: absents},
  
  ];

  const renderHeader = (section, index, isActive) => {
    return (
      <TouchableOpacity onPress={() => toggleSection(index)} style={{padding:10,backgroundColor:isActive ? "black":bgColor,borderRadius:5}}>
          <Text >{section.title}   ({section.content.length})</Text>
      </TouchableOpacity>
    );
  };

  const renderContent = (section) => {
    return (
      <View style={{margin:10}}>
        {section.content.map((student) => (
          <View key={student._id} style={{flexDirection:"row",justifyContent:"space-between",borderBottomWidth:2,borderBottomColor:"black",marginVertical:5}}> 
                <Text numberOfLines={1} style={{width:"40%"}}>{student.first_name + " " + student.last_name}</Text>
               <Text numberOfLines={1} style={{width:"40%",textAlign:"right"}}>{student.roll_number}</Text>
          </View>
        ))}
      </View>
    );
  };

  const toggleSection = (index) => {
    const isActive = activeSections.includes(index);
    setActiveSections(
      isActive
        ? activeSections.filter((i) => i !== index)
        : [...activeSections, index]
    );
  };

  const toggleCollapsible = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={toggleCollapsible}>

      <View style={{flexDirection:"row",justifyContent:"space-between",padding:10}}>
      <Text numberOfLines={1}>{elem.subject_name}</Text>
      <Text numberOfLines={1}>{formattedDateTime}</Text>
      </View>
      
      <Collapsible collapsed={isCollapsed}  >
          <Accordion
            sections={sections}
            activeSections={activeSections}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={setActiveSections}
          />
        </Collapsible>
    </TouchableOpacity>
  );

}

const styles = StyleSheet.create({
  container:{
    width:"100%",
    padding:10,
    borderWidth:2,
    borderColor:borderColor,
    backgroundColor:bgColor,
    marginVertical:10,
    borderRadius:10
    
  }
})