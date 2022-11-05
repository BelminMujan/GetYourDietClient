import { configureStore } from '@reduxjs/toolkit'
import blogsSlice from './redux/blogsSlice'
import userSlice from './redux/userSlice'

export default configureStore({
  reducer: {
    user: userSlice,
    blogs: blogsSlice
  },
})