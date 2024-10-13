import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    username: string | null;
    token: string | null;
}

const initialState: AuthState = {
    username: null,
    token: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        logout: (state) => {
            state.username = null;
        },
        storeJwtToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        removeJwtToken: (state) => {
            state.token = null;
        }
    },
});

export const { login, logout, storeJwtToken, removeJwtToken } = authSlice.actions;
export default authSlice.reducer;