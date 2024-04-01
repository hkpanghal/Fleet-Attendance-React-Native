import { createSlice,nanoid } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllStudents } from "../Services/database";

const initialState = {
    students:[],
    isLoading:true,
    isError:false,
}

export const fetchStudents = createAsyncThunk("fetchStudents", async ({class_id,user_id}) => {

    console.log(class_id)
    let data = []
    await getAllStudents(class_id,user_id)
    .then((res) => {
        // console.log(res.data.students)
        if(res.data.success){
            data = res.data.students
        }
    })
    .catch((err => {
        console.log(err)
       
    }))

    return data
})

export const studentSlice = createSlice({
    name:"student",
    initialState,
    reducers:{
        addStudent: (state,action) => {
         
            state.students.push(action.payload.data);
        },
        deleteStudent:  (state,action) => {
            
            state.students = state.students.filter((student) => student._id !== action.payload.student_id)
            
        },

     
        updateStudent:(state,action)=>{

            // console.log(action.payload.student_id,action.payload.first_name,action.payload.last_name,action.payload.roll_number)
            state.students.map((student) => student._id === action.payload.student_id ? (student.first_name = action.payload.first_name,student.last_name=action.payload.last_name,student.roll_number=action.payload.roll_number) : student)

        },
        switchIsPresent:(state,action) =>{
            state.students.map((student) =>  student.is_present = action.payload.is_present )
        },

        markIsPresent:(state,action) =>{
            // if(state.students[action.payload.index]._id === action.payload._id){
            //     state.students[action.payload.index].is_present = action.payload.is_present  
            // }
            state.students.map((student) => student._id === action.payload._id? student.is_present = action.payload.is_present : student)
        },
        
        deleteStudentsWhenClassIsDeleted:(state,action) => {
            state.students = state.students.filter((student) => student.cid !== action.payload.cid);
            localStorage.setItem("students",JSON.stringify(state.students));

        },

    
    },
    extraReducers: (builder) =>{
        builder.addCase(fetchStudents.fulfilled,(state,action) => {
            state.isLoading = false;
            state.students = action.payload
        })
        builder.addCase(fetchStudents.rejected,(state,action) => {
            state.isError = true;
            state.isLoading = false;

        })
        builder.addCase(fetchStudents.pending,(state,action) => {
            state.isLoading = true;
        })
    }
})

export const {addStudent , deleteStudent,setContentEditable,updateStudent,switchIsPresent,markIsPresent , deleteStudentsWhenClassIsDeleted} = studentSlice.actions
export default studentSlice.reducer;