import React, { useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "store/store"
import CircularProgress from "@mui/material/CircularProgress"
import { SnackBarComponent } from "common/components/SnackBar"
import s from "./App.module.scss"
import { BookSearchingSliceTypeExtended } from "common/types/types"
import { isLoadingTC } from "store/bookSearchingSlice"
import { SearchingField } from "features/SearchingField"

export const App = () => {
    const books = useAppSelector<BookSearchingSliceTypeExtended>((state) => state.books.books)
    const isLoading = useAppSelector<boolean>((state) => state.books.books.isLoading)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(isLoadingTC(true))
    }, [])

    return (
        <>
            {books.totalItems !== null ? (
                navigate("/search-result-page")
            ) : isLoading ? (
                <CircularProgress className={s.circ_bar} />
            ) : (
                <div className={s.app_wrapper}>
                    <div className={s.app}>
                        <div className={s.app_searchingfield}>
                            <h1 className={s.app_heading}>The Books</h1>
                            <SearchingField location={"main"} />
                        </div>
                    </div>
                    <SnackBarComponent />
                    <SnackBarComponent />
                </div>
            )}
        </>
    )
}
