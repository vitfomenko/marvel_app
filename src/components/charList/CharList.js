import {useState, useEffect, useRef} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorPage from '../errorPage/ErrorPage';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newCharLoading, setNewCharLoading] = useState(false);
    const [offset, setOffset] = useState(230);
    const [noMoreChar, setNoMoreChar] = useState(false);
    
    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        handleRequest(offset, true);
    }, []);

    const handleRequest = (offset, initial) => {
        initial ? setNewCharLoading(false) : setNewCharLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded);
    };

    const onCharListLoaded = (newCharList) => {
        let end = false;

        if(newCharList.length < 9) {
            end = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewCharLoading(false);
        setOffset(offset => offset + 9);
        setNoMoreChar(() => end);
    };

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    // This part of code just for optimization
    function renderItems(arr) {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    key={item.id}
                    ref={el => itemRefs.current[i] = el}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if(e.key === ' ' || e.key === 'Enter') {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }
        
    const items = renderItems(charList);

    const errorPage = error ? <ErrorPage/> : null;
    const spinner = loading && !setNewCharLoading ? <Spinner/> : null;

    return (
        <div className="char__list">
            {errorPage}
            {spinner}
            {items}
            <button 
                className="button button__main button__long"
                disabled={newCharLoading}
                style={{'display': noMoreChar ? 'none' : 'block'}}
                onClick={() => handleRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )

}

export default CharList;