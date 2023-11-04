import React, {memo, useState} from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';

import {fetchSearchingBookTC} from '../../../store/bookSearchingSlice'
import {useAppDispatch, useAppSelector} from '../../../store/store'

import s from './BooksResult.module.css'
import noImage from '../../../assets/No-Image-Placeholder.png'
import {ItemsType} from "../../types/types";
import {v4} from "uuid";

export const BooksResult = memo(() => {
    const [pageNumState, setPageNumState] = useState<number>(31)
    const booksItems = useAppSelector<ItemsType[]>(state => state.books.books.items)
    const totalItems = useAppSelector<number | null>(state => state.books.books.totalItems)
    const isLoading = useAppSelector<boolean>(state => state.books.books.isLoading)
    const searchingBooksValue = useAppSelector<string>(state => state.books.books.query)
    const dispatch = useAppDispatch()
    const relevance = useAppSelector<'relevance' | 'newest'>(state => state.books.books.booksRelevance)
    const category = useAppSelector<'all' | 'art' | 'biography' | 'computer' | 'history' | 'medical' | 'poetry'>(state => state.books.books.booksCategory)

    const onChangePageHandler = () => {
        searchingBooksValue && dispatch(fetchSearchingBookTC({searchingBooksValue, pageNum: pageNumState, relevance, category, pagination: true}))
        const newPageNumState = pageNumState + 30
        setPageNumState(newPageNumState)
    }

    return <>
        <Grid container
              rowSpacing={1}
              columnSpacing={{xs: 1, sm: 2, md: 3}}
        >
            {
                totalItems === 0 || totalItems === null
                    ? <Grid className={s.grid_empty_result}
                            xs={12}>
                        <Typography color="text.secondary">Книги не найдены</Typography>
                    </Grid>
                    : booksItems.map(el => {
                                return <Grid key={v4()} xs={12}>
                                        <Paper className={isLoading ? s.grid_loading : s.grid} elevation={2}>
                                            <div className={s.img}>
                                                <img src={el.volumeInfo.imageLinks?.smallThumbnail ?
                                                    el.volumeInfo.imageLinks?.smallThumbnail :
                                                    noImage}
                                                     alt={el.volumeInfo.title}
                                                />
                                            </div>
                                            <Card sx={{minWidth: 640}} variant="elevation" elevation={0}>
                                                <CardContent className={isLoading ? s.cards_loading : s.cards} sx={{minWidth: 640, paddingTop: 0}}>
                                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                                        <a href={el.volumeInfo.previewLink} className={s.link} target="_blank">
                                                            {
                                                                el.volumeInfo.previewLink
                                                                    .replace('http://', '')
                                                                    .replace('/', '>')
                                                                    .replace(/\?.*/, '')
                                                            }
                                                        </a>
                                                    </Typography>
                                                    <Typography variant="h5" component="div">
                                                        <a href={el.volumeInfo.previewLink} className={s.link} target="_blank">
                                                            <span className={s.title}>{el.volumeInfo.title}</span>
                                                        </a>
                                                    </Typography>
                                                    <Typography sx={{mb: 1.5}} color="text.secondary">
                                                        <span>
                                                            {
                                                                el.volumeInfo.authors && el.volumeInfo.authors.map((autor, i) =>
                                                                    el.volumeInfo.authors.length - 1 === i ? autor : `${autor}, `)
                                                            }
                                                        </span>
                                                        &nbsp;
                                                        <span>{el.volumeInfo.publishedDate?.slice(0, 4)}</span>
                                                    </Typography>
                                                    <Typography variant="body2">
                                                            <span>{el.searchInfo?.textSnippet}</span>
                                                    </Typography>
                                                </CardContent>
                                                <CardActions className={isLoading ? s.cards_loading : s.cards}>
                                                    <Button size="small">
                                                        <a href={el.volumeInfo.previewLink} className={s.btn_link} target="_blank">
                                                            <span>Подробнее...</span>
                                                        </a>
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Paper>
                                    </Grid>
                            })
                        }
                </Grid>
                {
                    !!totalItems && <Grid className={s.pagination_btn_container} xs={12}>
                        <Button className={s.pagination_btn}
                                size={"large"}
                                onClick={onChangePageHandler}
                        >ЗАГРУЗИТЬ ЕЩЁ
                        </Button>
                    </Grid>
                }
            </>
})