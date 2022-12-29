import UserRedux from './UserRedux'
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
    users: UserRedux
    },
  });

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch