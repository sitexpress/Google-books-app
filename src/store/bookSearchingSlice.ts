import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
    BooksCategoryType,
    BookSearchingSliceExtendedType,
    BooksRelevanceType,
    ErrorMessageType,
    ItemsType
} from "../common/types/types"
import { searchBooks } from "../features/SearchingField"
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk"
import { AxiosResponse } from "axios"
import { appActions, appLoading } from "../app/appSlice"
import { handleServerNetworkError } from "../common/utils/handle.server.network.error"

export const fetchSearchingBookTC = createAppAsyncThunk<
    { books: BookSearchingSliceExtendedType; query: string; pagination: boolean },
    {
        query: string
        pageNum: number
        relevance: BooksRelevanceType
        category: BooksCategoryType
        pagination: boolean
    }
>("books/searchingBookThunk", async (payload, thunkAPI) => {
    const { query, pageNum, relevance, category, pagination } = payload
    const { dispatch, rejectWithValue } = thunkAPI
    try {
        dispatch(appActions.setAppLoading({ isLoading: true }))
        const res: AxiosResponse = await searchBooks.search(query, pageNum, relevance, category)
        dispatch(appActions.setAppLoading({ isLoading: false }))
        return { books: res.data, query, pagination }
    } catch (err) {
        dispatch(appActions.setAppLoading({ isLoading: false }))
        handleServerNetworkError(err, dispatch)
        return rejectWithValue(null)
    }
})

const initialState = {
    books: {
        items: [] as ItemsType[],
        kind: "",
        totalItems: null,
        page: 0,
        query: "",
        booksRelevance: "relevance" as BooksRelevanceType,
        booksCategory: "all" as BooksCategoryType
    } as BookSearchingSliceExtendedType
}

const bookSearchingSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        resetAllState: (state) => {
            state.books = {
                items: [],
                kind: "",
                totalItems: null,
                page: 0,
                query: "",
                booksRelevance: "relevance",
                booksCategory: "all"
            }
        },
        booksCategory: (state, action: PayloadAction<{ booksCategory: BooksCategoryType }>) => {
            state.books.booksCategory = action.payload.booksCategory
        },
        booksRelevance: (state, action: PayloadAction<{ booksRelevance: BooksRelevanceType }>) => {
            state.books.booksRelevance = action.payload.booksRelevance
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSearchingBookTC.fulfilled, (state, action) => {
            if (action.payload) {
                state.books.page = action.payload.books.page
                state.books.kind = action.payload.books.kind
                state.books.totalItems = action.payload.books.totalItems && action.payload.books.totalItems
                state.books.query = action.payload.query
                if (action.payload.books.items && action.payload.pagination === true) {
                    state.books.items.push(...action.payload.books.items)
                }
                if (action.payload.books.items && action.payload.pagination === false) {
                    state.books.items.splice(0, state.books.items.length)
                    state.books.items.push(...action.payload.books.items)
                }
            }
        })
    }
})

export const bookSearchingReducer = bookSearchingSlice.reducer
export const bookSearchingActions = bookSearchingSlice.actions
