import { AppRootStateType } from "../../../store/store"
export const selectErrorMessage = (state: AppRootStateType) => state.app.errorMessage.message
export const selectIsError = (state: AppRootStateType) => state.app.isError
