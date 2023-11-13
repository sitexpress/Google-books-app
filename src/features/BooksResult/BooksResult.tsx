import React, { memo, useEffect, useState } from "react"
import Grid from "@mui/material/Unstable_Grid2"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"

import { fetchSearchingBookTC, isLoadingTC } from "../../store/bookSearchingSlice"
import { useAppDispatch, useAppSelector } from "../../store/store"

import s from "./BooksResult.module.scss"
import noImage from "../../assets/images/No-Image-Placeholder.png"
import { BooksCategoryType, BooksRelevanceType, ItemsType } from "../../common/types/types"
import { v4 } from "uuid"
import { useNavigate } from "react-router-dom"

export const BooksResult = memo(() => {
  const [pageNumState, setPageNumState] = useState<number>(31)
  const [booksItemsLC, setBooksItemsLC] = useState([])
  const booksItems = useAppSelector<ItemsType[]>((state) => state.books.books.items)
  const totalItems = useAppSelector<number | null>((state) => state.books.books.totalItems)
  const isLoading = useAppSelector<boolean>((state) => state.books.books.isLoading)
  const searchingBooksValue = useAppSelector<string>((state) => state.books.books.query)
  const dispatch = useAppDispatch()
  const relevance = useAppSelector<BooksRelevanceType>((state) => state.books.books.booksRelevance)
  const category = useAppSelector<BooksCategoryType>((state) => state.books.books.booksCategory)

  const navigate = useNavigate()

  const onChangePageHandler = () => {
    searchingBooksValue &&
      dispatch(
        fetchSearchingBookTC({
          searchingBooksValue,
          pageNum: pageNumState,
          relevance,
          category,
          pagination: true
        })
      )
    const newPageNumState = pageNumState + 30
    setPageNumState(newPageNumState)
  }

  const bookDetailsNavigateHandler = (book: ItemsType) => {
    dispatch(isLoadingTC(true))
    navigate("/book-details-page", {
      state: { book }
    })
    dispatch(isLoadingTC(false))
  }

  useEffect(() => {
    const item = localStorage.getItem("key_book")
    const booksItemsParsed = !!item && JSON.parse(item)
    setBooksItemsLC(booksItemsParsed)
    console.log(booksItemsParsed)
  }, [])

  return (
    <>
      <Grid container rowSpacing={1}>
        {totalItems === 0 || totalItems === null ? (
          <Grid className={s.grid_empty_result}>
            <Typography color="text.secondary">Книги не найдены</Typography>
          </Grid>
        ) : (
          booksItemsLC.map((book: ItemsType) => {
            return (
              <Grid key={v4()} className={s.grid}>
                <Paper
                  className={isLoading ? s.grid_loading : s.paper}
                  elevation={2}
                  onClick={() => bookDetailsNavigateHandler(book)}
                >
                  <div className={s.img}>
                    <img
                      src={
                        book.volumeInfo.imageLinks?.smallThumbnail
                          ? book.volumeInfo.imageLinks?.smallThumbnail
                          : noImage
                      }
                      alt={book.volumeInfo.title}
                    />
                  </div>
                  <Card variant="elevation" elevation={0}>
                    <CardContent className={isLoading ? s.cards_loading : s.cards}>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        <a href={book.volumeInfo.previewLink} className={s.link} target="_blank">
                          {book.volumeInfo.previewLink.replace("http://", "").replace("/", ">").replace(/\?.*/, "")}
                        </a>
                      </Typography>
                      <Typography variant="h5" component="div">
                        <a href={book.volumeInfo.previewLink} className={s.link} target="_blank">
                          <span className={s.title}>{book.volumeInfo.title}</span>
                        </a>
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        <span>
                          {book.volumeInfo.authors && book.volumeInfo.authors.filter((autor, i) => i === 1 && autor)}
                        </span>
                        &nbsp;
                        <span>{book.volumeInfo.publishedDate?.slice(0, 4)}</span>
                      </Typography>
                      <Typography variant="body2">
                        <span>{book.searchInfo?.textSnippet}</span>
                      </Typography>
                    </CardContent>
                  </Card>
                </Paper>
              </Grid>
            )
          })
        )}
      </Grid>
      {!!totalItems && (
        <Grid className={s.pagination_btn_container} xs={12}>
          <Button className={s.pagination_btn} size={"large"} onClick={onChangePageHandler}>
            ЗАГРУЗИТЬ ЕЩЁ
          </Button>
        </Grid>
      )}
    </>
  )
})
