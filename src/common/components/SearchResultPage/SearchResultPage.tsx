import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Unstable_Grid2'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import {SearchingField} from '../SearchingField/SearchingField'
import {ItemsType} from '../../../store/bookSearchingSlice'
import { useAppSelector } from '../../../store/store'
import Skeleton from '@mui/material/Skeleton';
import LinearProgress from '@mui/material/LinearProgress'
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'
import s from './SearchResultPage.module.css'
import noImage from '../../../assets/No-Image-Placeholder.png'
import {useState} from 'react'

export const SearchResultPage = () => {
    const[page, setPage] = useState<number>(1)
    const booksItems = useAppSelector<ItemsType[]>(state => state.books.books.items)
    const totalItems = useAppSelector<number>(state => state.books.books.totalItems)
    const isLoading = useAppSelector<boolean>(state => state.books.books.isLoading)

    return <>
            {isLoading && <LinearProgress/>}
            <CssBaseline />
                <Container maxWidth="lg" className={s.search_result_container}>
                    <div>
                        <Button size="small"><a href="/" className={s.btn_link}>На главную</a></Button>
                        <SearchingField location={'search-result-page'}/>
                    </div>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {
                            booksItems.length ? booksItems.filter((bookItem,i) => i < page*10 && bookItem).map(el => {
                                    return <Grid key={el.id} className={s.grid} xs={12}>
                                        <div className={s.img}>
                                            {
                                                isLoading
                                                ? <Skeleton variant="rectangular" animation="wave" width={100} height={130} />
                                                : <img
                                                        src={
                                                            el.volumeInfo.imageLinks?.smallThumbnail ?
                                                            el.volumeInfo.imageLinks?.smallThumbnail :
                                                            noImage
                                                            }
                                                        alt=""
                                                    />
                                            }

                                        </div>
                                        <Card sx={{minWidth: 640}} variant="elevation" elevation={0}>
                                            <CardContent sx={{minWidth: 640, paddingTop: 0}}>
                                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                                    {
                                                        isLoading
                                                            ? <Skeleton variant="rectangular" animation="wave" width={180} height={10} />
                                                            : <a href={el.volumeInfo.previewLink} className={s.link}>
                                                                    {
                                                                        el.volumeInfo.previewLink
                                                                            .replace('http://', '')
                                                                            .replace('/', '>')
                                                                            .replace(/\?.*/, '')
                                                                    }
                                                              </a>
                                                    }
                                                </Typography>
                                                <Typography variant="h5" component="div">
                                                    <a href={el.volumeInfo.previewLink} className={s.link}>
                                                        {
                                                            isLoading
                                                                ? <Skeleton variant="rectangular" animation="wave" width={180} height={20} />
                                                                : <span className={s.title}>{el.volumeInfo.title}</span>
                                                        }

                                                    </a>
                                                </Typography>
                                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                                    <span>
                                                        {
                                                            isLoading
                                                            ? <Skeleton variant="rectangular" animation="wave" width={180} height={10} />
                                                            : el.volumeInfo.authors.map((autor, i) => el.volumeInfo.authors.length - 1 === i ? autor : `${autor}, `)
                                                        }
                                                    </span>
                                                    <span>&nbsp;
                                                        {
                                                            isLoading
                                                                ? <Skeleton variant="rectangular" animation="wave" width={180} height={10} />
                                                                : el.volumeInfo.publishedDate?.slice(0, 4)
                                                        }
                                                    </span>
                                                </Typography>
                                                <Typography variant="body2">
                                                    <span>
                                                        {
                                                            isLoading
                                                                ? <Skeleton variant="rectangular" animation="wave" width={300} height={20} />
                                                                : el.searchInfo?.textSnippet
                                                        }
                                                    </span>
                                                </Typography>
                                            </CardContent>

                                            <CardActions>
                                                <Button size="small">
                                                    <a href={el.volumeInfo.previewLink} className={s.btn_link}>
                                                        {
                                                            isLoading
                                                                ? <Skeleton variant="rectangular" animation="wave" width={100} height={20} />
                                                                : <span>More editions</span>

                                                        }
                                                    </a>
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                })
                                :
                                ''
                        }
                    </Grid>
                    {
                        !!totalItems && <Stack className={s.pagination_container} spacing={2}>
                        <h2>Booooooooooks</h2>
                        <Pagination count={Math.ceil(totalItems / 100)}
                                    page={page}
                                    showFirstButton
                                    showLastButton
                                    onChange={(_, num:number) => setPage(num)}
                        />
                    </Stack>
                    }
                </Container>
        </>
}