import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "store/store"
import { SnackBarComponent } from "common/components/SnackBar"
import s from "./App.module.scss"
import { BookSearchingSliceExtendedType } from "common/types/types"
import { SearchingField } from "features/SearchingField"
import { Loader } from "../common/components/Loader/Loader"
import { appActions } from "./appSlice"

export const App = () => {
    const books = useAppSelector<BookSearchingSliceExtendedType>((state) => state.books.books)
    const isLoading = useAppSelector<boolean>((state) => state.app.isLoading)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (books.totalItems !== null) {
            navigate("/search-result-page")
        }
        dispatch(appActions.setAppLoading({ isLoading: false }))
    }, [books])

    return (
        <>
            {isLoading ? (
                <Loader className={s.circBar_container} />
            ) : (
                <div className={s.app_wrapper}>
                    <div className={s.app}>
                        <div className={s.app_searchingfield}>
                            <h1 className={s.app_heading}>The Books</h1>
                            <SearchingField location={"main"} />
                        </div>
                    </div>
                    <div className={s.snackbarContainer}>
                        <SnackBarComponent />
                    </div>
                </div>
            )}
        </>
    )
}
