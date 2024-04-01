
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Home from '../Screens/Home'
import { bgColor } from '../Constants/colors'
import Classes from '../Screens/Classes'
import TimeTable from '../Screens/TimeTable'
import Profile from '../Screens/Profile'
import History from '../Screens/History'
import Students from '../Screens/Students'
import SnapShot from '../Screens/SnapShot'

const stack = createNativeStackNavigator()
const AppStack = () => {
  return (
    <stack.Navigator screenOptions={{headerStyle:{backgroundColor:bgColor},headerTitleAlign:"center"}} >
        <stack.Group>
           <stack.Screen name='Home' component={Home}/>
           <stack.Group>
              <stack.Screen name='Classes' component={Classes}/>
              <stack.Screen name='Students' component={Students}/>
           </stack.Group>
           <stack.Screen name='TimeTable' component={TimeTable}/>
           <stack.Screen name='Profile' component={Profile}/>
           <stack.Group>
             <stack.Screen name='History' component={History}/>
             <stack.Screen name='Snapshots' component={SnapShot}/>
           </stack.Group>
        </stack.Group>
      
        
    </stack.Navigator>
  )
}

export default AppStack

