import React from "react"
import ReactDOM from "react-dom/client"
import reportWebVitals from "./reportWebVitals"
import { Provider } from "react-redux"
import persistor, { store } from "./store/store"
import { PersistGate } from "redux-persist/integration/react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ErrorPage } from "./features/ErrorPage"
import { SearchingResultPage } from "./features/SearchingResultPage"
import { BookDetails } from "./features/BookDetails"
import { Loader } from "./common/components/Loader/Loader"

import "./index.scss"
import s from "./index.module.scss"

const router = createBrowserRouter([
    {
        path: "/",
        async lazy() {
            let { App } = await import("./app")
            return { Component: App }
        },
        errorElement: <ErrorPage />
    },
    {
        path: "/search-result-page",
        element: <SearchingResultPage />
    },
    {
        path: "/book-details-page",
        element: <BookDetails />
    }
])

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router} fallbackElement={<Loader className={s.circBar_container} />} />
        </PersistGate>
    </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
