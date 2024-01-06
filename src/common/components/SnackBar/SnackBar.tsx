import * as React from "react"
import Stack from "@mui/material/Stack"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert, { AlertProps } from "@mui/material/Alert"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import s from "./SnackBar.module.scss"
import { selectErrorMessage, selectIsError } from "./snackBar.selector"
import { appActions } from "../../../app/appSlice"

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const SnackBarComponent = () => {
    const isError = useAppSelector<boolean>(selectIsError)
    const errorMessage = useAppSelector<string>(selectErrorMessage)
    const dispatch = useAppDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return
        }

        console.log("click")
        dispatch(appActions.setAppError({ isError: false }))
    }

    return (
        <Snackbar
            open={isError}
            autoHideDuration={6000}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
            }}
        >
            <Alert onClose={handleClose} severity="error" className={s.snackBar}>
                {errorMessage}
            </Alert>
        </Snackbar>
    )
}
