import * as React from "react"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert, { AlertProps } from "@mui/material/Alert"
import { useAppSelector } from "../../../store/store"
import { useEffect } from "react"

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const SnackBarComponent = () => {
  const isError = useAppSelector<boolean>((state) => state.books.books.isError)
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }
    setOpen(false)
  }

  useEffect(() => {
    setOpen(isError)
  }, [isError])

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={open} autoHideDuration={5000} onClick={handleClick}>
        <Alert onClose={handleClose} severity="error">
          This is an error message!
        </Alert>
      </Snackbar>
      {/*<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>*/}
      {/*    This is a success message!*/}
      {/*</Alert>*/}
      {/*<Alert severity="warning">This is a warning message!</Alert>*/}
      {/*<Alert severity="info">This is an information message!</Alert>*/}
      {/*<Alert severity="success">This is a success message!</Alert>*/}
    </Stack>
  )
}
