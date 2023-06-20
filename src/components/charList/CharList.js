import {Component} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorPage from '../errorPage/ErrorPage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newCharLoading: false,
        offset: 230,
        noMoreChar: false
    }
    
    marvelService = new MarvelService();

    componentDidMount() {
        this.handleRequest();
    }

    handleRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoaded = (newCharList) => {

        let end = false;

        if(newCharList.length < 9) {
            end = true;
        }

        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newCharsLoading: false,
            offset: offset + 9,
            noMoreChar: end
        }))
    }

    onCharListLoading = () => {
        this.setState({newCharsLoading: true})
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    renderItems(arr) {
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}>
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

    render() {

        const {charList, loading, error, offset, newCharLoading, noMoreChar} = this.state;
        
        const items = this.renderItems(charList);

        const errorPage = error ? <ErrorPage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorPage}
                {spinner}
                {content}
                <button 
                    className="button button__main button__long"
                    disabled={newCharLoading}
                    style={{'display': noMoreChar ? 'none' : 'block'}}
                    onClick={() => this.handleRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;