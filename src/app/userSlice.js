import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    listUser:[
      {
        "name": "Eric",
        "email": "Eric@gmails.com",
        "password": "123",
        "favoriteGenre": "Rock"
      },
    ],
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        addUser : (state, action) => {
          const index = state.listUser.findIndex((user) => user.email === action.payload.email)
          if(index>-1){
            throw new Error("Email already in use")
          }
            state.listUser.push(action.payload)
        },
        updateUser : (state, action) => {
          const index = state.listUser.findIndex((user) => user.email === action.payload.email)
          if(index==-1){
            throw new Error("Email not found")
          }
          state.listUser[index] = action.payload
        },
        deleteUser : (state, action) => {
          const index = state.listUser.findIndex((user) => user.email === action.payload)
          if(index==-1){
            throw new Error("Email not found")
          }
          state.listUser.splice(index, 1)
      },
    }
})

export const {addUser,updateUser,deleteUser} = userSlice.actions

export default userSlice.reducer