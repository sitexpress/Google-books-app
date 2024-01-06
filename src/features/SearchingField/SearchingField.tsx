import * as React from "react"
import { ChangeEvent, FocusEvent, KeyboardEvent, memo, useEffect, useState } from "react"
import TextField from "@mui/material/TextField"
import { SearchingBtn } from "common/components/SearchingBtn"
import { useAppDispatch, useAppSelector } from "store/store"
import { fetchSearchingBookTC } from "store/bookSearchingSlice"
import { SelectComponent } from "common/components/SelectComponent"
import { ClearBtn } from "common/components/ClearBtn"
import { BooksCategoryType, BooksRelevanceType } from "common/types/types"
import s from "./SearchingField.module.scss"
import { selectBookCategory, selectBookRelevance, selectorQuery } from "./searchingField.selector"

interface SearchingFieldType {
    location: "main" | "search-result-page"
}

export const SearchingField: React.FC<SearchingFieldType> = memo(({ location, ...other }) => {
    const [inputError, setInputError] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [focus, setFocus] = useState(false)
    const dispatch = useAppDispatch()
    const relevance = useAppSelector<BooksRelevanceType>(selectBookRelevance)
    const category = useAppSelector<BooksCategoryType>(selectBookCategory)
    const query = useAppSelector<string>(selectorQuery)

    const onSetInputValueHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputError(false)
        setInputValue(e.currentTarget.value)
    }
    const onSetInputValueKeyDownHandler = (e: KeyboardEvent<HTMLImageElement>) => {
        if (e.key === "Enter" && !!inputValue) {
            const pageNum = 0
            const query = inputValue.trim()
            if (!!query) {
                setInputError(false)
                dispatch(
                    fetchSearchingBookTC({
                        query,
                        pageNum,
                        relevance,
                        category,
                        pagination: false
                    })
                )
            } else {
                setInputError(true)
            }
        }

        if (e.key === "Enter" && !!inputValue === false) {
            setInputError(true)
        }
    }

    const onBlurInputValueHandler = (e: FocusEvent<HTMLInputElement>) => {
        if (!e.currentTarget.value) {
            setInputError(false)
        }
    }

    const onFocusInputValueHandler = (e: FocusEvent<HTMLInputElement>) => {
        if (e.currentTarget.value) {
            setFocus(true)
        }

        if (!!e.currentTarget.value) {
            setFocus(false)
        }
    }

    // const myTextFieldAutoFocus = inputValue

    useEffect(() => {
        setInputValue(query)
    }, [])

    return (
        <>
            <div className={location === "main" ? s.searchingField_main : s.searchingField_result}>
                <TextField
                    className={s.textfield}
                    value={inputValue}
                    error={inputError}
                    id="outlined-error-helper-text"
                    // label="Буковски..."
                    placeholder="Буковски..."
                    size="small"
                    onChange={onSetInputValueHandler}
                    onKeyDown={onSetInputValueKeyDownHandler}
                    onBlur={onBlurInputValueHandler}
                    onFocus={onFocusInputValueHandler}
                    autoFocus={!!inputValue}
                    helperText={inputError && <span className={s.helper_text}>Укажите название книги!</span>}
                    InputProps={{
                        endAdornment: !!inputValue && <ClearBtn setInputValue={setInputValue} />
                    }}
                />
                <SearchingBtn
                    inputValue={inputValue}
                    inputError={inputError}
                    setInputError={setInputError}
                    setInputValue={setInputValue}
                />
            </div>
            <div className={location === "main" ? s.filter_container : s.filter_container_result}>
                <SelectComponent selectType={"category"} />
                <SelectComponent selectType={"relevance"} />
            </div>
            {location === "main" && (
                <div className={s.descr}>
                    <div className={s.text}>
                        <p>Search the world's most comprehensive index of full-text books.</p>
                    </div>
                    <div className={s.mylibrary}>
                        <a href="https://books.google.com/" target="_blank">
                            <p>Powered by Google</p>
                        </a>
                    </div>
                </div>
            )}
        </>
    )
})
