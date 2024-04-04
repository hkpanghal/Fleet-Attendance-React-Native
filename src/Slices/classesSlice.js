import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, isFulfilled, isPending, nanoid } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addClassToDb, gtAllClasses } from "../Services/database";

const initialState = {
    classes:[],
    isLoading:true,
    isError:false,
    
}

export const fetchClasses = createAsyncThunk("fetchClasses" , async (user_id) => {
    let data = []
    await gtAllClasses(user_id).then((res)=>{
   
        if(res.data.success){
           
            data = res.data.classes
        }
    }).catch((err) => {
        console.log(err)
    })


    return data
})
export const classSlice = createSlice({
    name:"clas",
    initialState,
    reducers:{
        addClass:  (state,action) => {
            // const Class = {
            //     class_name:action.payload.class_name,
            //     students: action.payload.students,
            //     created_by:action.payload.created_by,
            //     // contentEditable:false,
            // }

           state.classes.push(action.payload.data);
   
        },
        deleteClass:(state,action) =>{
          state.classes = state.classes.filter( (Class) => Class.id !== action.payload);
       
        },
   
        renameClass:(state,action)=>{
            state.classes.map((Class) => Class._id === action.payload.class_id ? Class.class_name = action.payload.class_name : Class)
           
        },
        addelemStudentArray: (state,action) =>{

            state.classes.map((Class) => Class._id === action.payload.class_id ? Class.students.push(action.payload.student_id): Class)
    
        },

        delelemStudentArray:(state,action) => {
           
            state.classes.map((Class) => Class._id === action.payload.class_id ? Class.students.map((id,index) => id === action.payload.student_id? Class.students.splice(index,1):id): Class)

        }

    },

    extraReducers:(builder) => {
        builder.addCase(fetchClasses.fulfilled, (state,action) => {
            state.isLoading = false;
            state.classes = action.payload
        })
        builder.addCase(fetchClasses.rejected, (state,action) => {
           
        })
        builder.addCase(fetchClasses.pending, (state,action) => {
            state.isLoading = true;
        })
    }
})

export const {addClass , deleteClass ,renameClass ,setContentEditable,addelemStudentArray ,delelemStudentArray} = classSlice.actions
export default classSlice.reducer