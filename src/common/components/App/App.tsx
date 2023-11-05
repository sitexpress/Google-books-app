import React, { lazy, Suspense, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import CircularProgress from "@mui/material/CircularProgress";
import { SnackBarComponent } from "../SnackBar";
import s from "./App.module.css";
import { BookSearchingSliceTypeExtended } from "../../types/types";
import { isLoadingTC } from "../../../store/bookSearchingSlice";
import { SearchingField } from "../SearchingField";

export const App = () => {
  const books = useAppSelector<BookSearchingSliceTypeExtended>(
    (state) => state.books.books,
  );
  const isLoading = useAppSelector<boolean>(
    (state) => state.books.books.isLoading,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(isLoadingTC(true));
  }, []);

  return (
    <>
      {books.totalItems !== null ? (
        <Navigate to="/search-result-page" replace={true} />
      ) : isLoading ? (
        <CircularProgress className={s.circ_bar} />
      ) : (
        <div className={s.app_wrapper}>
          <div className={s.app}>
            <div className={s.app_container}>
              <h1 className={s.app_heading}>My books:</h1>
              <SearchingField location={"main"} />
            </div>
          </div>
          <SnackBarComponent />
          <SnackBarComponent />
        </div>
      )}
    </>
  );
};
