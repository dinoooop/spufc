import { configureStore } from '@reduxjs/toolkit'
import authSlice from './admin/auth/authSlice'
import userSlice from './admin/user/userSlice'
import generalSlice from './admin/general/generalSlice'
import homeSlice from './front/slices/homeSlice'

export default configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    general: generalSlice,
    home: homeSlice,
  }
})