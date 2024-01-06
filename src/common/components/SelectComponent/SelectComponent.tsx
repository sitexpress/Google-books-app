import * as React from "react"
import Box from "@mui/material/Box"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { bookSearchingActions } from "../../../store/bookSearchingSlice"
import { BooksCategoryType, BooksRelevanceType } from "../../types/types"
import s from "./SelectComponent.module.scss"
import { selectBookCategory, selectBookRelevance } from "./selectComponent.selector"
import { appActions } from "../../../app/appSlice"

interface SelectComponentType {
    selectType: "category" | "relevance"
}
export const SelectComponent: React.FC<SelectComponentType> = ({ selectType, ...other }) => {
    const relevance = useAppSelector<BooksRelevanceType>(selectBookRelevance)
    const category = useAppSelector<BooksCategoryType>(selectBookCategory)
    const dispatch = useAppDispatch()

    const handleChangeRelevance = (event: SelectChangeEvent) => {
        dispatch(bookSearchingActions.booksRelevance({ booksRelevance: event.target.value as BooksRelevanceType }))
    }
    const handleChangeCategory = (event: SelectChangeEvent) => {
        // dispatch(booksCategory(event.target.value as BooksCategoryType))
        dispatch(bookSearchingActions.booksCategory({ booksCategory: event.target.value as BooksCategoryType }))
    }
    // sx={{ minWidth: 200 }}

    return selectType === "relevance" ? (
        <Box className={s.box}>
            <FormControl>
                <Select
                    className={s.box_select}
                    id="select-relevance"
                    value={relevance}
                    onChange={handleChangeRelevance}
                >
                    <MenuItem value={"relevance"}>relevance</MenuItem>
                    <MenuItem value={"newest"}>newest</MenuItem>
                </Select>
            </FormControl>
        </Box>
    ) : (
        <Box className={s.box}>
            <FormControl>
                <Select className={s.box_select} id="select-category" value={category} onChange={handleChangeCategory}>
                    <MenuItem value={"all"}>all</MenuItem>
                    <MenuItem value={"art"}>art</MenuItem>
                    <MenuItem value={"biography"}>biography</MenuItem>
                    <MenuItem value={"computer"}>computer</MenuItem>
                    <MenuItem value={"history"}>history</MenuItem>
                    <MenuItem value={"medical"}>medical</MenuItem>
                    <MenuItem value={"poetry"}>poetry</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}
