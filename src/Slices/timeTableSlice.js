import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    data:[],
    isLoading:true,
    isError:false,
}

const timeTableSlice = createSlice({
    name:"timetable",
    initialState,

    reducers:{
        addTimeTable:(state,action) => {
            state.data.push(action.payload)
        }
    },
    extraReducers:(builder) => {

    }


})

export const {addTimeTable} = timeTableSlice.actions
export default timeTableSlice.reducer