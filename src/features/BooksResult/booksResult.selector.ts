import { AppRootStateType } from "../../store/store"

export const selectorBooksItems = (state: AppRootStateType) => state.books.books.items
export const selectorTotalItems = (state: AppRootStateType) => state.books.books.totalItems
export const selectorIsLoading = (state: AppRootStateType) => state.app.isLoading
export const selectorQuery = (state: AppRootStateType) => state.books.books.query
export const selectBookRelevance = (state: AppRootStateType) => state.books.books.booksRelevance
export const selectBookCategory = (state: AppRootStateType) => state.books.books.booksCategory
