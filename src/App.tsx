import React from 'react'

import {SearchingField} from './common/components/SearchingField/SearchingField'
import {Navigate, redirect} from 'react-router-dom'
import {useAppSelector} from './store/store'
import {BookSearchingSliceTypeExtended} from './store/bookSearchingSlice'
import LinearProgress from '@mui/material/LinearProgress'

import s from './App.module.css'
function App() {
    const books = useAppSelector<BookSearchingSliceTypeExtended>(state => state.books.books)
    const isLoading = useAppSelector<boolean>(state => state.books.books.isLoading)
    console.log('searchQuery:', books)


    return books.items.length > 0
        ?
            <Navigate to='/search-result-page' replace={true} />
        :
        <div className={s.app_wrapper}>
            {isLoading && <LinearProgress/>}
            <div className={s.app}>
                <div className={s.app_container}>
                    <h1 className={s.app_heading}>My books:</h1>
                    <SearchingField location={'main'}/>
                </div>
            </div>
        </div>

}

export default App;
