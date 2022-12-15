import { createSlice } from "@reduxjs/toolkit";

const foodSlice = createSlice({
    name: "food",
    initialState: { food: null, error: null, message: null, loading: false },
    reducers: {
        loadFoodSuccess: (state, action) => {
            state.food = action.payload;
        },
        loadFoodLoading: (state, action) => {
            state.loading = action.payload;
        },
        loadFoodError: (state, action) => {
            state.error = action.payload;
        },
        loadFoodMessage: (state, action) => {
            state.message = action.payload
        }
    },
});

export const getAllFood = () => async (dispatch) => {
    try {
        dispatch(loadFoodLoading(true))
        let res = await fetch(`${process.env.REACT_APP_API}/get-all-food`, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        dispatch(loadFoodError(null));
        dispatch(loadFoodMessage(null));
        let data = await res.json();
        if (data?.errors) {
            dispatch(loadFoodError(data.errors));
        }
        if (data?.message) {
            dispatch(loadFoodMessage(data.message));
        }
        dispatch(loadFoodLoading(false))
        if (data?.food) {
            dispatch(loadFoodSuccess(data.food));
            return data.food;
        }
        return false
    } catch (e) {
        console.log(e);
    }
};


export const { loadFoodError, loadFoodLoading, loadFoodMessage, loadFoodSuccess } = foodSlice.actions;
export default foodSlice.reducer;
