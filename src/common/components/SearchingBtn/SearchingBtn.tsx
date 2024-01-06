import React from "react"
import Button from "@mui/material/Button"
import SearchIcon from "@mui/icons-material/Search"
import s from "./searchingBtn.module.scss"
import { fetchSearchingBookTC } from "../../../store/bookSearchingSlice"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { BooksCategoryType, BooksRelevanceType } from "../../types/types"
import { selectBookCategory, selectBookRelevance } from "../SelectComponent/selectComponent.selector"
import { appLoading } from "app/appSlice"

interface SearchingBtnType {
    inputValue: string
    inputError: boolean
    setInputError: (value: boolean) => void
    setInputValue: (value: string) => void
}

export const SearchingBtn: React.FC<SearchingBtnType> = ({
    inputValue,
    inputError,
    setInputError,
    setInputValue,
    ...other
}) => {
    const dispatch = useAppDispatch()
    const relevance = useAppSelector<BooksRelevanceType>(selectBookRelevance)
    const category = useAppSelector<BooksCategoryType>(selectBookCategory)
    const searchingBooksHandler = () => {
        const pageNum = 0
        const query = inputValue.trim()
        dispatch(appLoading({ isLoading: true }))
        if (!!inputValue === false) {
            setInputError(true)
        }
        if (!!query) {
            setInputValue(inputValue)
            dispatch(
                fetchSearchingBookTC({
                    query,
                    pageNum,
                    relevance,
                    category,
                    pagination: false
                })
            )
        }
    }

    return (
        <Button className={s.btn} variant="contained" onClick={searchingBooksHandler}>
            <SearchIcon className={s.btn_icon} />
        </Button>
    )
}
