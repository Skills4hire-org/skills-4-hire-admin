import { configureStore } from '@reduxjs/toolkit'
import bookingReducer from './features/booking/bookingSlice'
import registrationReducer from './features/registration/registrationSlice'
import userReducer from './features/user/userSlice'

export const store = configureStore({
  reducer: {
    bookingState: bookingReducer,
    registrationState: registrationReducer,
    userState: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
