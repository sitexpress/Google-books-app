import {BookSearchingSliceType, BookSearchingSliceTypeExtended} from "../../../store/bookSearchingSlice";
import {instance} from "../../api";

export const searchBooks= {
    search(searchingTrimmedValue:string, page:number) {
        return instance.get<BookSearchingSliceTypeExtended>(
            `${searchingTrimmedValue}+inauthor:keyes&key=${process.env.REACT_APP_GOOGLE_API_KEY}&startIndex=${page}&maxResults=40`,

        )
    },
}