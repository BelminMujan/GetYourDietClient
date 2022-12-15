import { configureStore } from '@reduxjs/toolkit'
import foodSlice from './redux/foodSlice'
import blogsSlice from './redux/blogsSlice'
import userSlice from './redux/userSlice'
import dietRequestsSlice from './redux/dietRequestsSlice'

export default configureStore({
  reducer: {
    user: userSlice,
    blogs: blogsSlice,
    food: foodSlice,
    dietRequests: dietRequestsSlice
  },
})