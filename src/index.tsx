import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./common/components/ErrorPage";
import { SearchingResultPage } from "./common/components/SearchingResultPage";
import { App } from "./common/components/App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/search-result-page",
    element: <SearchingResultPage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
