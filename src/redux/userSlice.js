import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: { user: null, errors: null, message: null },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
        },
        loginErrors: (state, action) => {
            state.errors = action.payload;
        },
        loginMessage: (state, action) => {
            state.message = action.payload;
        },
        logoutReducer: (state, action) => {
            state.user = null;
            localStorage.removeItem("token");
        },
    },
});

export const login = ({ email, password }) => async (dispatch) => {
        try {
            let res = await fetch(`${process.env.REACT_APP_API}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({ email: email, password: password }),
            });
            let data = await res.json();
            dispatch(loginErrors(null));
            dispatch(loginMessage(null));
            if (data?.errors) {
                dispatch(loginErrors(data.errors));
            }
            if (data?.message) {
                dispatch(loginMessage(data.message));
            }
            if (data?.token && data?.user) {
                localStorage.setItem("token", data.token);
                dispatch(loginSuccess(data.user));
                return true;
            }
        } catch (e) {
            return console.log(e);
        }
    };

export const getUser = () => async (dispatch) => {  
    console.log("Getting user");  
    try {
        let res = await fetch(`${process.env.REACT_APP_API}/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        let data = await res.json();
        if (data.message) {
            return false;
        }
       dispatch(loginSuccess(data))
    } catch (e) {
        return console.log(e);
    }
};

export const { loginSuccess, logoutReducer, loginErrors, loginMessage } = userSlice.actions;
export default userSlice.reducer;
