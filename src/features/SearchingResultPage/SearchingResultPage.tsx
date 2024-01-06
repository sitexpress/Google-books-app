import React, { useState } from "react"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import { SearchingField } from "../SearchingField/SearchingField"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { BooksResult } from "../BooksResult"
import { Loader } from "../../common/components/Loader/Loader"
import { useNavigate } from "react-router-dom"
import { bookSearchingActions } from "../../store/bookSearchingSlice"
import { selectIsLoading, selectTotalItems } from "./searchingResultPage.selector"

import s from "./SearchingResultPage.module.scss"
import { appActions, appLoading } from "../../app/appSlice"

export const SearchingResultPage = () => {
    const totalItems = useAppSelector<number | null>(selectTotalItems)
    const isLoading = useAppSelector<boolean>(selectIsLoading)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onMainPageHandler = () => {
        dispatch(bookSearchingActions.resetAllState())
        navigate("/")
    }

    return (
        <>
            {isLoading && <Loader className={s.circBar_container} />}

            <div className={s.search_result_wrapper}>
                <Container sx={{ minHeight: "100vh" }} className={s.search_result_container}>
                    <div>
                        <div className={s.btn_link}>
                            <Button
                                size={"medium"}
                                variant={"contained"}
                                className={s.btn_main_page}
                                onClick={onMainPageHandler}
                            >
                                На главную
                            </Button>
                        </div>

                        <SearchingField location={"search-result-page"} />
                        <div className={s.total_text}>
                            {totalItems !== null && <span>Найдено: {totalItems} книг.</span>}
                        </div>
                    </div>
                    <div className={s.books_result_container}>
                        <BooksResult />
                    </div>
                </Container>
            </div>
        </>
    )
}
