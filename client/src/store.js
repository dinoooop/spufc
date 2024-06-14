import { configureStore } from '@reduxjs/toolkit'
import authSlice from './admin/auth/authSlice'
import userSlice from './admin/user/userSlice'

export default configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
  }
})