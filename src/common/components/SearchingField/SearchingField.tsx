import * as React from 'react'
import {ChangeEvent, KeyboardEvent, FocusEvent, useState, memo, useEffect} from 'react'

import TextField from '@mui/material/TextField'
import {SearchingBtn} from '../SearchingBtn/SearchingBtn'
import {ClearBtn} from "../ClearBtn/ClearBtn";

import s from './SearchingField.module.css'
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {fetchSearchingBookTC} from "../../../store/bookSearchingSlice";
import {SelectComponent} from "../SelectComponent/SelectComponent";


interface SearchingFieldType {
    location: 'main' | 'search-result-page'
}
export const SearchingField:React.FC<SearchingFieldType> = memo(({
                                                                location,
                                                                ...other
}) => {

    const [inputError, setInputError] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const dispatch = useAppDispatch()
    const relevance = useAppSelector<'relevance' | 'newest'>(state => state.books.books.booksRelevance)
    const category = useAppSelector<'all' | 'art' | 'biography' | 'computer' | 'history' | 'medical' | 'poetry'>(state => state.books.books.booksCategory)

    const onSetInputValueHandler = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setInputError(false)
            setInputValue(e.currentTarget.value)
    }

    const onSetInputValueKeyDownHandler = (e:KeyboardEvent<HTMLImageElement>) => {

        if(e.key === 'Enter' && !!inputValue) {
            const pageNum = 0
            const searchingBooksValue = inputValue.trim()
            if (!!searchingBooksValue) {
                setInputError(false)
                dispatch(fetchSearchingBookTC({searchingBooksValue, pageNum, relevance, category, pagination: false}))
            } else {
                setInputError(true)
            }
        }

        if(e.key === 'Enter' && !!inputValue === false) {
            setInputError(true)
        }
    }

    const onFocusInputValueHandler = (e: FocusEvent<HTMLInputElement>) => {
        if (!e.currentTarget.value) {
            setInputError(false)
        }
    }

    return <div className={s.wrapper}>
                <div className={location === 'main' ? s.searchingField_main : s.searchingField_result}>
                    <TextField
                        style={{width: 665}}
                        value={inputValue}
                        error={inputError}
                        id="outlined-error-helper-text"
                        label="Введите название книги"
                        size="small"
                        onChange={onSetInputValueHandler}
                        onKeyDown={onSetInputValueKeyDownHandler}
                        onBlur={onFocusInputValueHandler}
                        helperText={inputError && <span className={s.helper_text}>Введите текст!</span>}
                        InputProps={{endAdornment: !!inputValue && <ClearBtn setInputValue={setInputValue}/>}}
                    />
                    <SearchingBtn inputValue={inputValue}
                                  inputError={inputError}
                                  setInputError={setInputError}
                                  setInputValue={setInputValue}
                    />
                </div>
                <div className={location === 'main' ? s.filter_container : s.filter_container_result}>
                    <SelectComponent selectType={'category'}/>
                    <SelectComponent selectType={'relevance'}/>
                </div>
                {
                    location === 'main' &&
                    <div>
                        <div><p>Search the world's most comprehensive index of full-text books.</p></div>
                        <div className={s.mylibrary}> <p>My library. (in developing)</p></div>
                    </div>
                }
            </div>

})

