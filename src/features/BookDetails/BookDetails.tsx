import React from "react"
import { useLocation } from "react-router-dom"
import s from "./BookDetails.module.scss"
import noImage from "../../assets/images/No-Image-Placeholder.png"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Divider from "@mui/material/Divider"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import Button from "@mui/material/Button"

export const BookDetails = () => {
  const { state } = useLocation()

  return (
    <Container maxWidth="lg" className={s.container}>
      <div className={s.grid}>
        <div className={s.text}>
          <a href="/search-result-page">
            <Button size={"medium"} variant={"contained"} className={s.btn_main_page}>
              <ArrowBackIcon />
            </Button>
          </a>
          <Typography variant="h4" component="div">
            <a href={state.book.volumeInfo.previewLink} className={s.link} target="_blank">
              <h1 className={s.title}>{state.book.volumeInfo.title}</h1>
            </a>
          </Typography>
          <Typography variant="h5" className={s.year}>
            <h3>{state.book.volumeInfo.publishedDate?.slice(0, 4)} года</h3>
          </Typography>
          <Typography className={s.autors} color="text.secondary">
            <h2>
              <b>Полный список авторов: </b>
              {state.book.volumeInfo.authors &&
                state.book.volumeInfo.authors.map((autor: string, i: number) =>
                  state.book.volumeInfo.authors.length - 1 === i ? autor : `${autor}, `
                )}
            </h2>
            &nbsp;
          </Typography>

          <Typography variant="body2" className={s.descr}>
            <p>{state.book.volumeInfo?.description}</p>
          </Typography>
        </div>
        <div className={s.img}>
          <img
            src={
              state.book.volumeInfo.imageLinks?.smallThumbnail
                ? state.book.volumeInfo.imageLinks?.smallThumbnail
                : noImage
            }
            alt={state.book.volumeInfo.title}
          />
        </div>
      </div>
      <Divider light />
    </Container>
  )
}
