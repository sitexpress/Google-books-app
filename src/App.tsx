import React, {useEffect, Suspense, lazy } from 'react'
// import {SearchingField} from './common/components/SearchingField/SearchingField'
import {Navigate, redirect} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from './store/store'
import {BookSearchingSliceTypeExtended, IsLoadingTC} from './store/bookSearchingSlice'
import LinearProgress from '@mui/material/LinearProgress'
import CircularProgress from '@mui/material/CircularProgress';
import s from './App.module.css'


function App() {
    const books = useAppSelector<BookSearchingSliceTypeExtended>(state => state.books.books)
    const isLoading = useAppSelector<boolean>(state => state.books.books.isLoading)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(IsLoadingTC(true))
    },[])

    console.log('isLoading: ',isLoading)
    // return <>
    //         {
    //             isLoading
    //                 ? <CircularProgress className={s.circ_bar} disableShrink />
    //                 : books.items.length > 0
    //                 ?
    //                 <Navigate to='/search-result-page' replace={true} />
    //                 :
    //                 <div className={s.app_wrapper}>
    //                     {isLoading && <LinearProgress/>}
    //                     <div className={s.app}>
    //                         <div className={s.app_container}>
    //                             <h1 className={s.app_heading}>My books:</h1>
    //                             <SearchingField location={'main'}/>
    //                         </div>
    //                     </div>
    //                 </div>
    //         }
    //     </>

    const SearchingField = lazy(() =>
        import('./common/components/SearchingField/SearchingField')
            .then(({ SearchingField }) => ({ default: SearchingField })),
    )
    return <>
            {
                books.items.length > 0
                    ? <Navigate to='/search-result-page' replace={true} />
                    : <Suspense fallback={<CircularProgress className={s.circ_bar}/>}>
                        <div className={s.app_wrapper}>
                            {isLoading && <LinearProgress/>}
                                <div className={s.app}>
                                    <div className={s.app_container}>
                                        <h1 className={s.app_heading}>My books:</h1>
                                        <SearchingField location={'main'}/>
                                    </div>
                                </div>
                        </div>
                    </Suspense>
            }
        </>
}

export default App;
