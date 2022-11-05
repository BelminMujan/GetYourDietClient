import { createSlice } from "@reduxjs/toolkit";

const blogsSlice = createSlice({
    name: "blogs",
    initialState: { blogs: null, error: null, message: null, loading: false },
    reducers: {
        loadBlogsSuccess: (state, action) => {
            state.blogs = action.payload;
        },
        loadBlogsLoading: (state, action) => {
            state.loading = action.payload;
        },
        loadBlogsError: (state, action) => {
            state.error = action.payload;
        },
        loadBlogsMessage: (state, action) => {
            state.message = action.payload
        }
    },
});

export const getAllBlogs = () => async (dispatch) => {
    try {
        dispatch(loadBlogsLoading(true))
        let res = await fetch(`${process.env.REACT_APP_API}/get-all-blogs`, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        dispatch(loadBlogsError(null));
        dispatch(loadBlogsMessage(null));
        let data = await res.json();
        if (data?.errors) {
            dispatch(loadBlogsError(data.errors));
        }
        if (data?.message) {
            dispatch(loadBlogsMessage(data.message));
        }
        dispatch(loadBlogsLoading(false))
        if (data?.blogs) {
            dispatch(loadBlogsSuccess(data.blogs));
            return data.blogs;
        }
        return false
    } catch (e) {
        console.log(e);
    }
};


export const { loadBlogsSuccess, loadBlogsLoading, loadBlogsError, loadBlogsMessage } = blogsSlice.actions;
export default blogsSlice.reducer;
