import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {instance} from "../common/api/common-api";
import {AxiosError} from "axios";
import {searchBooks} from "../common/components/SearchingField/SearchingField-api";

interface ReadingModelsType {
    text: false,
    image: false
}
interface PanelizationSummaryType {
    containsEpubBubbles: boolean
    containsImageBubbles: boolean
}
interface ImageLinksType {
    smallThumbnail: string
    thumbnail: string
}
export interface VolumeInfoType {
    title: string
    authors: string[]
    publishedDate: string
    readingModes: ReadingModelsType
    pageCount: number
    printType: string
    maturityRating: string
    allowAnonLogging: boolean
    contentVersion: string
    panelizationSummary: PanelizationSummaryType
    imageLinks: ImageLinksType
    language: string
    previewLink: string
    infoLink: string
    canonicalVolumeLink: string
}
interface SaleInfoType {
        country: string
        saleability: string
        isEbook: false
}
interface EpubType {
    "isAvailable": boolean
}
interface PdfType {
    "isAvailable": boolean
}
interface AccessInfoType {
        country: string
        viewability: string
        embeddable: boolean
        publicDomain: boolean
        textToSpeechPermission: string
        epub: EpubType
        pdf: PdfType
        webReaderLink: string
        accessViewStatus: string
        quoteSharingAllowed: boolean
}

interface SearchInfoType {
    textSnippet: string
}
export interface ItemsType {
        kind: string
        id: string
        etag: string
        selfLink: string
        volumeInfo: VolumeInfoType
        saleInfo: SaleInfoType
        accessInfo: AccessInfoType
        searchInfo: SearchInfoType
}
export interface BookSearchingSliceType {
    kind: string
    totalItems: number
    items: ItemsType[]
}

export interface BookSearchingSliceTypeExtended extends BookSearchingSliceType {
    page: number
    isLoading: boolean
    isError: null | boolean
}

export const fetchSearchingBookTC = createAsyncThunk(
    'books/searchingBookThunk',
    async (payload:{searchingBooksValue:string, page:number}, {rejectWithValue}) => {
        try{
            const {searchingBooksValue, page} = payload
            const res = await searchBooks.search(searchingBooksValue, page)
                if (res.status === 200) {
                    console.log('Status 200:', {books: res})
                    return { books: res }
                } else {
                    return rejectWithValue({error: res})
                }
        } catch(error) {
            return rejectWithValue(error)
        }
    }
)

export const IsLoadingTC = createAsyncThunk('books/IsLoadingTC',
    (isLoading:boolean, {rejectWithValue}) => {
        try {
                return {isLoading: isLoading}
            } catch(error) {
                return rejectWithValue(error)
        }
    }
)

const initialState = {
    books: {
        items: [] as ItemsType[],
        kind: '',
        totalItems: 0,
        page:0,
        isLoading: false,
        isError: null,
    } as BookSearchingSliceTypeExtended

}

const bookSearchingSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(IsLoadingTC.pending, (state) => {
                state.books.isError = false
                state.books.isLoading = true
        })
        builder.addCase(IsLoadingTC.fulfilled, (state) => {
            state.books.isError = false
            state.books.isLoading = false
        })
        builder.addCase(IsLoadingTC.rejected, (state) => {
            state.books.isLoading = false
            state.books.isError = true
        })
        builder.addCase(fetchSearchingBookTC.pending, (state) => {
                state.books.isLoading = true
        })
        builder.addCase(fetchSearchingBookTC.fulfilled, (state, action) => {
            if(action.payload) {
                state.books.isError = false
                state.books.isLoading = false
                state.books.page = action.payload.books.data.page
                state.books.items = action.payload.books.data.items
                state.books.kind = action.payload.books.data.kind
                state.books.totalItems = action.payload.books.data.totalItems
            }
        })
        builder.addCase(fetchSearchingBookTC.rejected, (state, action) => {
            if(action.payload) {
                state.books.isLoading = false
                state.books.isError = true
            }
        })
    }
})

export const searchingBooksReducer = bookSearchingSlice.reducer