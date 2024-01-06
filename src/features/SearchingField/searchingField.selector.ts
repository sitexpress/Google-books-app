import { AppRootStateType } from "../../store/store"

export const selectorQuery = (state: AppRootStateType) => state.books.books.query
export const selectBookRelevance = (state: AppRootStateType) => state.books.books.booksRelevance
export const selectBookCategory = (state: AppRootStateType) => state.books.books.booksCategory
