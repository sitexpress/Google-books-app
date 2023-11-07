// -- Google API's types --

interface ReadingModelsType {
  text: false;
  image: false;
}
interface PanelizationSummaryType {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
}
interface ImageLinksType {
  smallThumbnail: string;
  thumbnail: string;
}
export interface VolumeInfoType {
  title: string;
  authors: string[];
  publishedDate: string;
  readingModes: ReadingModelsType;
  pageCount: number;
  printType: string;
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary: PanelizationSummaryType;
  imageLinks: ImageLinksType;
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
}
interface SaleInfoType {
  country: string;
  saleability: string;
  isEbook: false;
}
interface EpubType {
  isAvailable: boolean;
}
interface PdfType {
  isAvailable: boolean;
}
interface AccessInfoType {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: EpubType;
  pdf: PdfType;
  webReaderLink: string;
  accessViewStatus: string;
  quoteSharingAllowed: boolean;
}
interface SearchInfoType {
  textSnippet: string;
}
export interface ItemsType {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfoType;
  saleInfo: SaleInfoType;
  accessInfo: AccessInfoType;
  searchInfo: SearchInfoType;
}
export interface BookSearchingSliceType {
  kind: string;
  totalItems: number | null;
  items: ItemsType[];
}

// -- My additional types which extend the Google API's types --

export type BooksCategoryType =
      | "all"
      | "art"
      | "biography"
      | "computer"
      | "history"
      | "medical"
      | "poetry"

export type BooksRelevanceType = "relevance" | "newest"

export interface BookSearchingSliceTypeExtended extends BookSearchingSliceType {
  page: number
  isLoading: boolean
  isError: boolean
  query: string
  booksCategory: BooksCategoryType
  booksRelevance: BooksRelevanceType
}
