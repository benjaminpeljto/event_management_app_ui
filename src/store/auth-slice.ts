import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginFormType, RegisterFormType, UserType } from "../utils/types";
import appAxios from "../services/appAxios";

type authState = {
    loading: boolean;
    userToken: string | null;
    error: string | null;
    success: boolean;
    userType: UserType
}

const userToken = localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null;

const initialState: authState = {
    loading: false,
    userToken,
    error: null,
    success: false,
    userType: "GUEST"
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("userToken");
            state.error = null;
            state.loading = false;
            state.userToken = null;
            state.userType = "GUEST";
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(registerUser.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false,
            state.error = action.payload as string;
        })
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.success = true;
            state.loading = false;
            state.userType = action.payload.userType;
            state.userToken = action.payload.jwt;
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    }
})

export const registerUser = createAsyncThunk(
    'auth/register',
    async (data: RegisterFormType, { rejectWithValue }) => {
        try {
            await appAxios.post(
                'auth/register',
                data
            )
        } catch (error: any) { // eslint-disable-line
            if (error.response && error.response.data.message) {
              return rejectWithValue(error.response.data.message);
            } else {
              return rejectWithValue(error.message)
            }
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/login',
    async (body: LoginFormType, { rejectWithValue }) => {
        try {
            const { data } = await appAxios.post(
                'auth/login',
                body
            )
            localStorage.setItem("userToken", data.jwt)
            return data;
        } catch (error: any) { // eslint-disable-line

            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
              } else {
                return rejectWithValue(error.message)
              }
        }
    }
)

export const { logout } = authSlice.actions;