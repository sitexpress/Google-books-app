import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ErrorMessageType } from "../common/types/types"
import { createAppAsyncThunk } from "../common/utils/createAppAsyncThunk"

const initialState = {
    isError: false,
    isLoading: false,
    errorMessage: { message: "" } as ErrorMessageType
}
export type AppInitialStateType = typeof initialState
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
    }
})

export const appReducer = appSlice.reducer
export const appActions = appSlice.actions
