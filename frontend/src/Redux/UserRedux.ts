import { createSlice } from "@reduxjs/toolkit";

type User = {
    key: string;
    username: string;
    email: string;
    phone: string;
}
type InitialState = {
    usersList: User[]
}

const initialState: InitialState = {
    usersList: []
}
const userSlice = createSlice({
    initialState,
    name: "users",
    reducers: {},
});


export default userSlice.reducer; 
