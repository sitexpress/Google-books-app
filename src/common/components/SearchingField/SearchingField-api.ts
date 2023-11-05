import { instance } from "../../api";
import { BookSearchingSliceTypeExtended } from "../../types/types";

export const searchBooks = {
  search(
    searchingTrimmedValue: string,
    page: number,
    relevance: "relevance" | "newest",
    category:
      | "all"
      | "art"
      | "biography"
      | "computer"
      | "history"
      | "medical"
      | "poetry",
  ) {
    if (category === "all") {
      return instance.get<BookSearchingSliceTypeExtended>(
        `+intitle:${searchingTrimmedValue}&orderBy=${relevance}&startIndex=${page}&maxResults=30&key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
      );
    } else {
      return instance.get<BookSearchingSliceTypeExtended>(
        `+intitle:${searchingTrimmedValue}+subject:${category}&orderBy=${relevance}&startIndex=${page}&maxResults=30&key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
      );
    }
  },
};
