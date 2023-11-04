import React, {KeyboardEvent} from 'react'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'
import s from './searchingBtn.module.css'
import {fetchSearchingBookTC} from "../../../store/bookSearchingSlice"
import {useAppDispatch, useAppSelector} from "../../../store/store"

interface SearchingBtnType {
    inputValue: string
    inputError: boolean
    setInputError: (value: boolean) => void
    setInputValue: (value: string) => void
}
export const SearchingBtn:React.FC<SearchingBtnType> = ({
                                                            inputValue,
                                                            inputError,
                                                            setInputError,
                                                            setInputValue,
                                                            ...other
}) => {
    const dispatch = useAppDispatch()
    const relevance = useAppSelector<'relevance' | 'newest'>(state => state.books.books.booksRelevance)
    const category = useAppSelector<'all' | 'art' | 'biography' | 'computer' | 'history' | 'medical' | 'poetry'>(state => state.books.books.booksCategory)
    const searchingBooksHandler = () => {
        const pageNum = 0
        const searchingBooksValue = inputValue.trim()
        if(!!inputValue === false) {
            setInputError(true)
        }
        if (!!searchingBooksValue && !!searchingBooksValue) {
                setInputValue(inputValue)
                dispatch(fetchSearchingBookTC({searchingBooksValue, pageNum, relevance, category, pagination: false}))
        }
    }
    return <Button className={s.btn}
                   variant="contained"
                   onClick={searchingBooksHandler}
            >
                <SearchIcon className={s.btn_icon}/>
            </Button>
}

