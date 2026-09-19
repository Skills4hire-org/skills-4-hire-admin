import type { AuthUser } from '@/types/user.types'
import { createSlice } from '@reduxjs/toolkit'

const defaultState: AuthUser = {
  userType: 'professional',
  access: null,
  refresh: null,
  user_data: null,
}

const getUserFromLocalStorage: () => AuthUser = () => {
  const user = sessionStorage.getItem('user')
  return user ? JSON.parse(user) : defaultState
}

const userSlice = createSlice({
  name: 'user',
  initialState: getUserFromLocalStorage(),
  reducers: {
    setUserCredentials: (state, action) => {
      const { access, refresh, user_data } = action.payload
      state.access = access
      state.refresh = refresh
      state.user_data = user_data
      state.userType = user_data.is_customer ? 'customer' : 'professional'
      sessionStorage.setItem('user', JSON.stringify(state))
    },
    setAccessToken: (state, action) => {
      const accessToken = action.payload
      state.access = accessToken
      sessionStorage.setItem('user', JSON.stringify(state))
    },
    logoutUser: () => {
      sessionStorage.setItem('user', JSON.stringify(defaultState))
    },
  },
})

export const { setUserCredentials, setAccessToken, logoutUser } =
  userSlice.actions

export default userSlice.reducer
