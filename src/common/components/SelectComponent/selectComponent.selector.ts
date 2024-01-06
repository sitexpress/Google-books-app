import { AppRootStateType } from "../../../store/store"

export const selectBookRelevance = (state: AppRootStateType) => state.books.books.booksRelevance
export const selectBookCategory = (state: AppRootStateType) => state.books.books.booksCategory
