import { createSlice } from "@reduxjs/toolkit";


export const inputSlice=createSlice({
    name:"inputBoxSlice",
    initialState:{value:""},
    reducers:{
        setValue:(state,actions)=>{state.value=actions.payload},
        resetValue:(state)=>{state.value=""},
    }
})

export const {setValue,resetValue} =inputSlice.actions
export default inputSlice.reducer