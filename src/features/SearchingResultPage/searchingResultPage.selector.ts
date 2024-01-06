import { AppRootStateType } from "../../store/store"

export const selectIsLoading = (state: AppRootStateType) => state.app.isLoading
export const selectTotalItems = (state: AppRootStateType) => state.books.books.totalItems
