import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorPage from '../errorPage/ErrorPage';

import './singleComicPage.scss';

const SingleComicPage = () => {

    const {comicId} = useParams();
    const [comic, setComic] = useState(null);

    const {loading, error, getComic, clearError} = useMarvelService();

    useEffect(() => {
        handleUpdate();
    }, [comicId]);

    const onComicLoaded = (comic) => {
        setComic(comic);
    };

    const handleUpdate = () => {
        
        clearError();
        getComic(comicId).then(onComicLoaded);
    };

    const errorPage = error ? <ErrorPage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
        <>
            {errorPage}
            {spinner}
            {content}
        </>
    );
}

const View = ({comic}) => {

    const {title, description, pageCount, thumbnail, languge, price} = comic;

    return(
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {languge}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    );
}

export default SingleComicPage;