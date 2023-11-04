import React, {useState} from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import {BooksResult} from '../BooksResult/BooksResult'
import Button from '@mui/material/Button'
import {SearchingField} from '../SearchingField/SearchingField'
import {useAppSelector} from '../../../store/store'
import CircularProgress from '@mui/material/CircularProgress';

import s from './SearchingResultPage.module.css'


export const SearchingResultPage = () => {
    const totalItems = useAppSelector<number | null>(state => state.books.books.totalItems)
    const isLoading = useAppSelector<boolean>(state => state.books.books.isLoading)

    return <>
        {isLoading && <CircularProgress className={s.circ_bar}/>}
        <CssBaseline />
        <div className={s.search_result_wrapper}>
            <Container maxWidth="lg" className={s.search_result_container}>
                <div>
                    <a href="/" className={s.btn_link}>
                        <Button size={"medium"} className={s.btn_main_page}>
                            На главную
                        </Button>
                    </a>
                    <SearchingField location={'search-result-page'}/>
                    <div  className={s.total_text}>
                        {totalItems !== null && <span>Найдено: {totalItems} книг.</span>}
                    </div>
                </div>
                <div>
                    <BooksResult/>
                </div>
            </Container>
        </div>
    </>




}

