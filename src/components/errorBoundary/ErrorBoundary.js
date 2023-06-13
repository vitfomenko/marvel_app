import { Component } from 'react';
import ErrorPage from '../errorPage/ErrorPage';

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    componentDidCatch(error, info) {
        console.log(error, info);
        this.setState({error: true});
    }

    render() {
        if(this.state.error === true) {
            return <ErrorPage/>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;