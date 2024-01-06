import { AppRootStateType, AppDispatch } from "../../store/store"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootStateType
    dispatch: AppDispatch
    rejectValue: null
}>()
