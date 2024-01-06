import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ErrorMessageType } from "../common/types/types"
import { createAppAsyncThunk } from "../common/utils/createAppAsyncThunk"

const initialState = {
    isError: false,
    isLoading: false,
    errorMessage: { message: "" } as ErrorMessageType
}

export const appLoading = createAppAsyncThunk<{ isLoading: boolean }, { isLoading: boolean }>(
    "app/appLoading",
    async (payload, thunkAPI) => {
        const { rejectWithValue } = thunkAPI
        const { isLoading } = payload
        try {
            console.log("appLoading")
            return { isLoading }
        } catch (err) {
            return rejectWithValue(null)
        }
    }
)

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setAppError: (state, action: PayloadAction<{ isError: boolean }>) => {
            state.isError = action.payload.isError
        },
        setAppErrorMessage: (state, action: PayloadAction<{ errorMessage: string }>) => {
            state.errorMessage.message = action.payload.errorMessage
        },
        setAppLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
            state.isLoading = action.payload.isLoading
        }
    },
    extraReducers: {}
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(appLoading.pending, (state, action) => {
    //             if (action.payload) {
    //                 state.isLoading = true
    //             }
    //         })
    //         .addCase(appLoading.rejected, (state, action) => {
    //             if (action.payload) {
    //                 state.isLoading = false
    //             }
    //         })
    //         .addCase(appLoading.fulfilled, (state, action) => {
    //             if (action.payload) {
    //                 state.isLoading = false
    //             }
    //         })
    // }
})

export const appReducer = appSlice.reducer
export const appActions = appSlice.actions
