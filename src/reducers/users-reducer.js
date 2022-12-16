import {createSlice} from "@reduxjs/toolkit";
import {
    findAllUsersThunk,
    loginThunk,
    logoutThunk,
    registerThunk,
    profileThunk,
    deleteUserThunk,
    updateUserThunk,
    createUserThunk,
    findUserByIdThunk
} from "../services/users-thunks";

const initialState = {
    loading: false,
    users: [],
    currentUser: null,
    publicProfile: {},
    error: null
}

const UsersReducer = createSlice({
    name: 'users',
    initialState,
    extraReducers: {
        [createUserThunk.fulfilled]: (state, action) => {
            state.loading = false;
            state.users.push(action.payload);
        },
        [registerThunk.pending]: state => {
            state.loading = true;
            state.currentUser = null;
        },
        [registerThunk.fulfilled]: (state, action) => {
            state.loading = false;
            state.users.push(action.payload);
            state.currentUser = action.payload;
        },
        [registerThunk.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.currentUser = null;
        },
        [findAllUsersThunk.pending]: state => {
            state.loading = true;
            state.users = [];
        },
        [findAllUsersThunk.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = action.payload;
        },
        [findAllUsersThunk.rejected]: state => {
            state.loading = false;
        },
        [deleteUserThunk.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = state.users.filter(user => user._id !== action.payload);
        },
        [updateUserThunk.fulfilled]: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload
        },
        [loginThunk.pending]: state => {
            state.loading = true;
            state.currentUser = null;
            state.error = null;
        },
        [loginThunk.fulfilled]: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
        },
        [loginThunk.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.currentUser = null;
        },
        [logoutThunk.fulfilled]: state => {
            state.loading = false;
            state.currentUser = null;
        },
        [profileThunk.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.currentUser = null;
        },
        [profileThunk.fulfilled]: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
        },
        [findUserByIdThunk.fulfilled]: (state, action) => {
            state.loading = false
            state.publicProfile = action.payload
        }
    }
});
export default UsersReducer.reducer;