import * as React from 'react'
import {ChangeEvent, KeyboardEvent, useState} from 'react'

import TextField from '@mui/material/TextField'
import {SearchingBtn} from '../SearchingBtn/SearchingBtn'
import {ClearBtn} from "../ClearBtn/ClearBtn";

import s from './SearchingField.module.css'


interface SearchingFieldType {
    location: 'main' | 'search-result-page'
}
export const SearchingField:React.FC<SearchingFieldType> = ({location}) => {
    const [inputValue, setInputValue] = useState('')
    console.log(inputValue)
    const onSetInputValueHandler = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setInputValue(e.currentTarget.value)
    }

    // const onSetInputValueKeyDownHandler = (e:KeyboardEvent<HTMLImageElement>) => {
    //     if(e.key === 'Backspace') {
    //     }
    // }
    return <div>
                <div className={location === 'main' ? s.searchingField_main : s.searchingField_result}>
                    <TextField
                        style={{width: 665}}
                        error={false}
                        id="outlined-error-helper-text"
                        label="Введите название книги"
                        size="small"
                        value={inputValue}
                        onChange={onSetInputValueHandler}
                        // onKeyDown={onSetInputValueKeyDownHandler}
                        // helperText="Incorrect entry."
                        InputProps={{endAdornment: !!inputValue && <ClearBtn setInputValue={setInputValue}/>}}
                    />
                    <SearchingBtn inputValue={inputValue}/>
                </div>
                    <div>{location === 'main' && <p>Search the world's most comprehensive index of full-text books.</p>}</div>
                    <div className={s.mylibrary}>{location === 'main' && <p>My library. (in developing)</p>}</div>
            </div>

}