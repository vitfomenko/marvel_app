import { useEffect, useState } from 'react';
import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorPage from '../errorPage/ErrorPage';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        handleUpdate();
    }, [props.charId]);

    const onCharLoaded = (char) => {
        setChar(char);
    };

    const handleUpdate = () => {
        const {charId} = props;
        if(!charId) {
            return;
        }
        
        clearError();
        getCharacter(charId).then(onCharLoaded);
    };

 
    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorPage = error ? <ErrorPage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
            <div className="char__info">
                {skeleton}
                {errorPage}
                {spinner}
                {content}

            </div>
    )
    
}

const View = ({char}) => {

    const {name, description, thumbnail, homepage, wiki, comics} = char;

    let imgStyle = {'objectFit': 'cover'};
    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    return (
        <>
            <div className="char__basics">
                    <img src={thumbnail} alt={name} style={imgStyle}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {
                       comics.length !== 0 ? comics.map((item, i) => {
                            // eslint-disable-next-line
                            if(i > 9) {
                                return;
                            }
                            return (
                                <li key={i} className="char__comics-item">
                                    {item.name}
                                </li>
                            );
                        }) : "Sorry, there are no comics yet :("
                    }
                </ul>
        </>
    );
}

export default CharInfo;