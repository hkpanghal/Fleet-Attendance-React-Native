import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllAttendanceData } from "../Services/database"

const initialState = {
    data:[],
    isLoading:true,
    isError:false,
}

export const fetchAttendances = createAsyncThunk("fetchAttendances",async ({class_id,user_id}) => {
    let data = []
    await getAllAttendanceData(class_id,user_id)
    .then((res) => {
        if(res.data.success){
            data = res.data.attendances
        }
    })
    .catch((err) => {
        console.log(err)
    })

    return data
})
const attendanceSlice = createSlice({
    name:"attendance",
    initialState,
    reducers:{

    },
    extraReducers:(builder) => {
        builder.addCase(fetchAttendances.fulfilled,(state,action) => {
            state.isLoading = false;
            state.data = action.payload
        })
        builder.addCase(fetchAttendances.rejected,(state,action) => {

        })
        builder.addCase(fetchAttendances.pending,(state,action) => {
            state.isLoading = true;
        })
    }
})

export const  {} = attendanceSlice.actions
export default attendanceSlice.reducer