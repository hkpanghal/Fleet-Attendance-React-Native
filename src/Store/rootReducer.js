import userDetailsReducer from "../Slices/userDetails"
import classReducer from "../Slices/classesSlice"
import studentReducer from "../Slices/studentsSlice"
import attendanceReducer from "../Slices/attendanceSlice"
import timetableReducer from "../Slices/timeTableSlice"
import { combineReducers } from "@reduxjs/toolkit"
export const rootReducer = combineReducers({
    user:userDetailsReducer,
    clas:classReducer,
    student:studentReducer,
    attendance:attendanceReducer,
    timetable:timetableReducer
    
})