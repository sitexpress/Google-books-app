import { bookSearchingActions, bookSearchingReducer, BookSearchingStateType } from "./bookSearchingSlice"
import {
    BooksCategoryType,
    BookSearchingSliceExtendedType,
    BooksRelevanceType,
    ItemsType
} from "../../common/types/types"

let startState: BookSearchingStateType

beforeEach(() => {
    startState = {
        books: {
            items: [] as ItemsType[],
            kind: "" as string,
            totalItems: null,
            page: 0 as number,
            query: "" as string,
            booksRelevance: "relevance" as BooksRelevanceType,
            booksCategory: "all" as BooksCategoryType
        }
    }
})

test("category should be set correctly", () => {
    const endState = bookSearchingReducer(startState, bookSearchingActions.booksCategory({ booksCategory: "art" }))
    expect(endState.books.booksCategory).toBe("art")
})

test("books relevance should be set correctly", () => {
    const endState = bookSearchingReducer(
        startState,
        bookSearchingActions.booksRelevance({ booksRelevance: "relevance" })
    )
    expect(endState.books.booksRelevance).toBe("relevance")
})
