import React from 'react'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'
import s from './searchingBtn.module.css'
import {fetchSearchingBookTC} from "../../../store/bookSearchingSlice"
import {useAppDispatch} from "../../../store/store"

interface SearchingBtnType {
    inputValue: string
}
export const SearchingBtn:React.FC<SearchingBtnType> = ({inputValue, ...other}) => {
    const dispatch = useAppDispatch()
    const searchingBooksHandler = () => {
        const page = 0
        const searchingBooksValue = inputValue.trim()
        if (!!searchingBooksValue) {
                dispatch(fetchSearchingBookTC({searchingBooksValue, page}))
        }
    }
    return <Button className={s.btn}
                   variant="contained"
                   onClick={searchingBooksHandler}
            >
                <SearchIcon className={s.btn_icon}/>
            </Button>
}

