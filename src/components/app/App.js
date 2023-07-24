import { lazy, Suspense } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';

const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage.js'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));
const ErrorPage = lazy(() => import('../errorPage/ErrorPage'));


const App = () => {

        return (
            <BrowserRouter>
                <div className="app">
                    <AppHeader/>
                    <main>
                        <Suspense fallback={<Spinner/>}>
                            <Routes>
                                <Route path="/" element={<MainPage/>} />
                                <Route path="/comics" element={<ComicsPage/>} />
                                <Route path="/comics/:comicId" element={<SingleComicPage/>} />
                                <Route path="*" element={<ErrorPage/>} />
                            </Routes>
                        </Suspense>
                    </main>
                </div>
            </BrowserRouter>
        )

}

export default App;