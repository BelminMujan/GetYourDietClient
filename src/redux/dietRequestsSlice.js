import { createSlice } from "@reduxjs/toolkit";

const dietRequestsSlice = createSlice({
    name: "dietRequests",
    initialState: { dietRequests: null, error: null, message: null, loading: false },
    reducers: {
        loadDietRequestsSuccess: (state, action) => {
            state.dietRequests = action.payload;
        },
        loadDietRequestsLoading: (state, action) => {
            state.loading = action.payload;
        },
        loadDietRequestsError: (state, action) => {
            state.error = action.payload;
        },
        loadDietRequestsMessage: (state, action) => {
            state.message = action.payload
        }
    },
});

export const getAllDietRequests = () => async (dispatch) => {
    try {
        dispatch(loadDietRequestsLoading(true))
        let res = await fetch(`${process.env.REACT_APP_API}/get-all-diet-requests`, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        dispatch(loadDietRequestsError(null));
        dispatch(loadDietRequestsMessage(null));
        let data = await res.json();
        if (data?.errors) {
            dispatch(loadDietRequestsError(data.errors));
        }
        if (data?.message) {
            dispatch(loadDietRequestsMessage(data.message));
        }
        dispatch(loadDietRequestsLoading(false))
        if (data?.dietRequests) {
            dispatch(loadDietRequestsSuccess(data.dietRequests));
            return data.dietRequests;
        }
        return false
    } catch (e) {
        console.log(e);
    }
};

export const deleteDietRequest=async (id)=>{
    try {
        let res = await fetch(`${process.env.REACT_APP_API}/delete-diet-request/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return res
    } catch (e) {
        return console.log(e);
    }
}

export const { loadDietRequestsError, loadDietRequestsLoading, loadDietRequestsMessage, loadDietRequestsSuccess } = dietRequestsSlice.actions;
export default dietRequestsSlice.reducer;
