import { Dispatch } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"
import { appActions } from "../../app/appSlice"

export const handleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        const error = err.message ? err.message : "Something went wrong, try again"
        dispatch(appActions.setAppError({ isError: true }))
        dispatch(appActions.setAppErrorMessage({ errorMessage: error }))
    } else {
        dispatch(appActions.setAppError({ isError: true }))
        dispatch(appActions.setAppErrorMessage({ errorMessage: `Something went wrong, try again` }))
    }
}
