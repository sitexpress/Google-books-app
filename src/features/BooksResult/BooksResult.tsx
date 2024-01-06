import React, { memo, useEffect, useState } from "react"
import Grid from "@mui/material/Unstable_Grid2"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"

import { fetchSearchingBookTC } from "../SearchingField/bookSearchingSlice"
import { useAppDispatch, useAppSelector } from "../../store/store"

import s from "./BooksResult.module.scss"
import noImage from "../../assets/images/No-Image-Placeholder.png"
import { BooksCategoryType, BooksRelevanceType, ItemsType } from "../../common/types/types"
import { v4 } from "uuid"
import { useNavigate } from "react-router-dom"
import {
    selectBookCategory,
    selectBookRelevance,
    selectorBooksItems,
    selectorIsLoading,
    selectorQuery,
    selectorTotalItems
} from "./booksResult.selector"
import { appActions, appLoading } from "../../app/appSlice"

export const BooksResult = () => {
    const [pageNumState, setPageNumState] = useState<number>(31)
    const booksItems = useAppSelector<ItemsType[]>(selectorBooksItems)
    const totalItems = useAppSelector<number | null>(selectorTotalItems)
    const isLoading = useAppSelector<boolean>(selectorIsLoading)
    const query = useAppSelector<string>(selectorQuery)
    const relevance = useAppSelector<BooksRelevanceType>(selectBookRelevance)
    const category = useAppSelector<BooksCategoryType>(selectBookCategory)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onChangePageHandler = () => {
        dispatch(appLoading({ isLoading: true }))
        query &&
            dispatch(
                fetchSearchingBookTC({
                    query,
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
        dispatch(appActions.setAppLoading({ isLoading: true }))
        dispatch(appLoading({ isLoading: true }))
        navigate("/book-details-page", {
            state: { book }
        })
        dispatch(appActions.setAppLoading({ isLoading: false }))
    }

    return (
        <>
            <Grid container rowSpacing={1}>
                {totalItems === 0 || totalItems === null ? (
                    <Grid className={s.grid_empty_result}>
                        <Typography color="text.secondary">Книги не найдены</Typography>
                    </Grid>
                ) : (
                    booksItems.map((book: ItemsType) => {
                        return (
                            <Grid key={v4()} className={s.grid}>
                                <Paper
                                    className={isLoading ? s.paper_loading : s.paper}
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
                                                {book.volumeInfo.previewLink
                                                    .replace("http://", "")
                                                    .replace("/", ">")
                                                    .replace(/\?.*/, "")}
                                            </Typography>
                                            <Typography variant="h5" component="div">
                                                <span className={s.title}>{book.volumeInfo.title}</span>
                                            </Typography>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                <span>
                                                    {book.volumeInfo.authors &&
                                                        book.volumeInfo.authors.filter((autor, i) => i === 1 && autor)}
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
            {!!totalItems && +totalItems > 30 && (
                <Grid className={s.pagination_btn_container}>
                    <Button className={s.pagination_btn} size={"large"} onClick={onChangePageHandler}>
                        ЗАГРУЗИТЬ ЕЩЁ
                    </Button>
                </Grid>
            )}
        </>
    )
}
