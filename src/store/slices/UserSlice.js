import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    email: null,
    token: null,
    uid: null
}
const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email
            state.token = action.payload.token
            state.uid = action.payload.uid

        },
        removeUser(state){
            state.email = null
            state.token = null
            state.uid = null
        }
    }

})

export const {setUser, removeUser} = userSlice.actions
export default userSlice.reducer