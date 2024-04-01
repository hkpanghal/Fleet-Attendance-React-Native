import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { bgColor, borderColor } from '../Constants/colors'
import Icons from '../utils/Icons'
import ClassComp from '../components/ClassComp'
import AddClassCard from '../components/AddClassCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchClasses } from '../Slices/classesSlice'
import Loader from '../components/Loader'


export default function Classes({navigation}) {
    
    const [displayAddClassCard,setDisplayAddClassCard] = useState(false)
    const classes = useSelector((state) => state.clas.classes)
    const userDetails = useSelector((state) => state.user.details)
    const isLoading = useSelector((state) => state.clas.isLoading)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchClasses(userDetails._id))
    },[])

    if(isLoading){
        return <Loader />
    }

  return (
    <SafeAreaView style={styles.main}>
        <View style={styles.searchBarContainer}>
            <TextInput style={styles.searchBar} placeholder='🔍Search'  />
            <TouchableOpacity style={styles.addClass} onPress={()=> setDisplayAddClassCard(true)}>
                 <Icons name={"pluscircleo"} category={"AntDesign"}  />
                 <Text>Class</Text>
            </TouchableOpacity>
        </View>

        <FlatList numColumns={1} keyExtractor={(elem) => elem._id} data={classes} renderItem={(elem) => <ClassComp elem={elem.item} navigation={navigation}  />}/>
        <AddClassCard display={displayAddClassCard} setDisplay={setDisplayAddClassCard}/>

       
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        alignItems:"center",
        paddingHorizontal:15,
        position:"relative",
   
    },
    searchBarContainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        gap:15,
        width:"100%"
    },
    searchBar:{
        borderWidth:2,
        borderColor:borderColor,
        backgroundColor:bgColor,
        marginVertical:20,
        borderRadius:10,
        width:"87%",
        paddingHorizontal:20
    },
    addClass:{
        alignItems:"center",
        justifyContent:"center"
    }
})