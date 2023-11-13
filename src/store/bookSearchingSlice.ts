import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { BooksCategoryType, BookSearchingSliceTypeExtended, BooksRelevanceType, ItemsType } from "../common/types/types"
import { searchBooks } from "../features/SearchingField"

export const fetchSearchingBookTC = createAsyncThunk(
  "books/searchingBookThunk",
  async (
    payload: {
      searchingBooksValue: string
      pageNum: number
      relevance: BooksRelevanceType
      category: BooksCategoryType
      pagination: boolean
    },
    { rejectWithValue }
  ) => {
    try {
      const { searchingBooksValue, pageNum, relevance, category, pagination } = payload
      const res = await searchBooks.search(searchingBooksValue, pageNum, relevance, category)
      if (res.status === 200) {
        console.log("Status 200:", { books: res })
        console.log("Status 300:", { pagination })
        return { books: res, query: searchingBooksValue, pagination }
      } else {
        return rejectWithValue({ error: res })
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const isLoadingTC = createAsyncThunk("books/IsLoadingTC", (isLoading: boolean, { rejectWithValue }) => {
  try {
    return { isLoading }
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const booksRelevance = createAsyncThunk(
  "books/booksRelevance",
  (booksRelevance: BooksRelevanceType, { rejectWithValue }) => {
    try {
      return { booksRelevance }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const booksCategory = createAsyncThunk(
  "books/booksCategory",
  (booksCategory: BooksCategoryType, { rejectWithValue }) => {
    try {
      return { booksCategory }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const initialState = {
  books: {
    items: [] as ItemsType[],
    kind: "",
    totalItems: null,
    page: 0,
    isLoading: false,
    isError: false,
    query: "",
    booksRelevance: "relevance" as BooksRelevanceType,
    booksCategory: "all" as BooksCategoryType
  } as BookSearchingSliceTypeExtended
}

const bookSearchingSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(isLoadingTC.pending, (state) => {
      state.books.isError = false
      state.books.isLoading = true
    })
    builder.addCase(isLoadingTC.fulfilled, (state) => {
      state.books.isError = false
      state.books.isLoading = false
    })
    builder.addCase(isLoadingTC.rejected, (state) => {
      state.books.isLoading = false
      state.books.isError = true
    })

    builder.addCase(booksRelevance.pending, (state) => {
      state.books.isError = false
      state.books.isLoading = false
    })
    builder.addCase(booksRelevance.fulfilled, (state, action) => {
      state.books.isError = false
      state.books.booksRelevance = action.payload.booksRelevance
    })
    builder.addCase(booksRelevance.rejected, (state) => {
      state.books.isError = true
    })

    builder.addCase(booksCategory.pending, (state) => {
      state.books.isError = false
    })
    builder.addCase(booksCategory.fulfilled, (state, action) => {
      state.books.isError = false
      state.books.booksCategory = action.payload.booksCategory
    })
    builder.addCase(booksCategory.rejected, (state) => {
      state.books.isError = true
    })

    builder.addCase(fetchSearchingBookTC.pending, (state) => {
      state.books.isLoading = true
    })
    builder.addCase(fetchSearchingBookTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.books.isError = false
        state.books.isLoading = false
        state.books.page = action.payload.books.data.page
        state.books.kind = action.payload.books.data.kind
        state.books.totalItems = action.payload.books.data.totalItems
        state.books.query = action.payload.query
        if (action.payload.books.data.items && action.payload.pagination === true) {
          state.books.items.push(...action.payload.books.data.items)
          localStorage.setItem("key_book", JSON.stringify(action.payload.books.data.items))
        }
        if (action.payload.books.data.items && action.payload.pagination === false) {
          state.books.items.splice(0, state.books.items.length - 1)
          state.books.items.push(...action.payload.books.data.items)
          localStorage.setItem("key_book", JSON.stringify(action.payload.books.data.items))
        }
      }
    })
    builder.addCase(fetchSearchingBookTC.rejected, (state, action) => {
      if (action.payload) {
        state.books.isLoading = false
        state.books.isError = true
      }
    })
  }
})

export const searchingBooksReducer = bookSearchingSlice.reducer
