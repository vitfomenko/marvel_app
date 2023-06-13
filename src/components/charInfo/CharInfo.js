import { Component } from 'react';
import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorPage from '../errorPage/ErrorPage';
import Skeleton from '../skeleton/Skeleton';

class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.handleUpdate();
    }

    componentDidUpdate(prevProps) {
        if(this.props.charId !== prevProps.charId) {
            this.handleUpdate();
        }
    }

    onError = () => {
        this.setState({loading: false, error: true});
    }

    onCharLoaded = (char) => {
        this.setState({char, loading: false});
    }

    onCharLoading = () => {
        this.setState({loading: true});
    }

    handleUpdate = () => {
        const {charId} = this.props;

        if(!charId) {
            return;
        }

        this.onCharLoading();

        this.marvelService.getCharacter(charId).then(this.onCharLoaded).catch(this.onError);
    }

    render() {

        const { char, loading, error } = this.state;

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