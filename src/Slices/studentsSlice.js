import { createSlice,nanoid } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllStudents } from "../Services/database";
import { sortStudents } from "../utils/operations";

const initialState = {
    students:[],
    isLoading:true,
    isError:false,
}

export const fetchStudents = createAsyncThunk("fetchStudents", async ({class_id,user_id}) => {
    let data = []
    await getAllStudents(class_id,user_id)
    .then(async (res) => {
        // console.log(res.data.students)
        if(res.data.success){
            await sortStudents(res.data.students)
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
            sortStudents(state.students)
        },
        deleteStudent:  (state,action) => {
            
            state.students = state.students.filter((student) => student._id !== action.payload.student_id)
            sortStudents(state.students)
        },

     
        updateStudent:(state,action)=>{

            // console.log(action.payload.student_id,action.payload.first_name,action.payload.last_name,action.payload.roll_number)
            // state.students.map((student) => student._id === action.payload.student_id ? (student.first_name = action.payload.first_name,student.last_name=action.payload.last_name,student.roll_number=action.payload.roll_number) : student)
            if(state.students[action.payload.index]._id === action.payload._id){
                state.students[action.payload.index].first_name = action.payload.first_name  
                state.students[action.payload.index].last_name = action.payload.last_name  
                state.students[action.payload.index].roll_number = action.payload.roll_number  
            }
            
        },
        switchIsPresent:(state,action) =>{
            state.students.map((student) =>  student.is_present = action.payload.is_present )
        },

        markIsPresent:(state,action) =>{
            if(state.students[action.payload.index]._id === action.payload._id){
                state.students[action.payload.index].is_present = action.payload.is_present  
            }
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