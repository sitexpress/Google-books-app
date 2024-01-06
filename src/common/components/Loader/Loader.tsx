import React from "react"
import s from "../../../app/App.module.scss"
import CircularProgress from "@mui/material/CircularProgress"

interface LoaderClassNameType {
    className: string
}
export const Loader: React.FC<LoaderClassNameType> = ({ className }) => {
    return (
        <div className={className}>
            <CircularProgress />
        </div>
    )
}
