import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import s from "./BookDetails.module.scss"
import noImage from "../../assets/images/No-Image-Placeholder.png"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Divider from "@mui/material/Divider"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import Button from "@mui/material/Button"

export const BookDetails = () => {
    const { state } = useLocation()
    const navigate = useNavigate()

    const onNavigateHandler = () => {
        console.log("navClicked")
        return navigate("/search-result-page")
    }

    return (
        <Container maxWidth="lg" className={s.container}>
            <Button size={"medium"} variant={"contained"} className={s.btn_main_page} onClick={onNavigateHandler}>
                <ArrowBackIcon />
            </Button>
            <Typography className={s.title}>
                <h1>{state.book.volumeInfo.title}</h1>
            </Typography>
            <div className={s.grid}>
                <div className={s.text}>
                    <Typography variant="body2" className={s.descr}>
                        <h2 className={s.descr_heading}>Описание:</h2>
                        <p className={s.descr_text}>{state.book.volumeInfo?.description}</p>
                    </Typography>

                    <Typography className={s.year} color="text.secondary">
                        <h3>{state.book.volumeInfo.publishedDate?.slice(0, 4)} года</h3>
                    </Typography>
                    <Typography className={s.autors} color="text.secondary">
                        <h2>
                            <p>Полный список авторов: &nbsp;</p>
                            {state.book.volumeInfo.authors &&
                                state.book.volumeInfo.authors.map((autor: string, i: number) =>
                                    state.book.volumeInfo.authors.length - 1 === i ? autor : `${autor}, `
                                )}
                        </h2>
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
