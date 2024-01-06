import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import s from "./BookDetails.module.scss"
import noImage from "../../assets/images/No-Image-Placeholder.png"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Divider from "@mui/material/Divider"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import Button from "@mui/material/Button"
import { appActions } from "../../app/appSlice"

export const BookDetails = () => {
    const { state } = useLocation()
    const navigate = useNavigate()

    const onNavigateHandler = () => {
        navigate("/search-result-page")
    }

    return (
        <Container maxWidth="lg" className={s.container}>
            <Button size={"medium"} variant={"contained"} className={s.btn_main_page} onClick={onNavigateHandler}>
                <ArrowBackIcon />
            </Button>
            <Typography variant="h1" className={s.title}>
                <span>{state.book.volumeInfo.title}</span>
            </Typography>
            <div className={s.grid}>
                <div className={s.text}>
                    <Typography variant="body2" color="text.secondary" className={s.descr}>
                        <span className={s.heading}>Описание:</span>
                        <span className={s.text}>{state.book.volumeInfo?.description}</span>
                    </Typography>

                    <Typography className={s.year} color="text.secondary">
                        <span>{state.book.volumeInfo.publishedDate?.slice(0, 4)} года</span>
                    </Typography>

                    <Typography className={s.autors} color="text.secondary">
                        <span>Полный список авторов: &nbsp;</span>
                        <span>
                            {state.book.volumeInfo.authors &&
                                state.book.volumeInfo.authors.map((autor: string, i: number) =>
                                    state.book.volumeInfo.authors.length - 1 === i ? autor : `${autor}, `
                                )}
                        </span>
                        &nbsp;
                    </Typography>
                </div>
                <div className={s.img}>
                    <a href={state.book.volumeInfo.previewLink} className={s.link} target="_blank">
                        <img
                            src={
                                state.book.volumeInfo.imageLinks?.smallThumbnail
                                    ? state.book.volumeInfo.imageLinks?.smallThumbnail
                                    : noImage
                            }
                            alt={state.book.volumeInfo.title}
                        />
                    </a>
                </div>
            </div>
            <Divider light />
        </Container>
    )
}
