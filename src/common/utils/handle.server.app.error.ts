import { ResponseType } from "../types/common.types"
import { Dispatch } from "@reduxjs/toolkit"
import { appActions } from "../../app/appSlice"

export const handleServerAppError = <D, T>(data: ResponseType<D, T>, dispatch: Dispatch) => {
    if (data.error.message.length) {
        dispatch(appActions.setAppError({ isError: true }))
        dispatch(appActions.setAppErrorMessage({ errorMessage: data.error.message }))
    } else {
        dispatch(appActions.setAppError({ isError: true }))
        dispatch(appActions.setAppErrorMessage({ errorMessage: "Something went wrong, try again" }))
    }
}
