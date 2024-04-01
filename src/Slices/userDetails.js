import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState ={
    details:{},
    isLoggedIn:false,
    isLoading:true,
    isError:false,
}
export const fetchDetails = createAsyncThunk("fetchDetails" , async () => {
  const jsonValue = await AsyncStorage.getItem("user_data");

  return jsonValue ? JSON.parse(jsonValue) : null
})
export const userDetailsSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setDetails:(state,action) => {

        },
        setIsLoggedIn: (state,action) => {
          state.isLoggedIn = action.payload.isLoggedIn
        }

      
    },
    extraReducers:(builder) => {
        builder.addCase(fetchDetails.fulfilled, (state,action) => {
         
          state.isLoading = false;
          if(action.payload){
            state.isLoggedIn = true,
            state.details = action.payload
          }
          else{
        
            state.isLoggedIn = false
          }
        })
        builder.addCase(fetchDetails.rejected, (state,action) => {
         
            state.isLoading = false;
            state.isLoggedIn = false;
        })
        builder.addCase(fetchDetails.pending, (state,action) => {
      
            state.isLoading = true;
        })
    }
})

export default userDetailsSlice.reducer 
export const {setIsLoggedIn} = userDetailsSlice.actions
