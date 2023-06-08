import errorImg from '../../resources/img/404_error.png';

const ErrorPage = () => {
    return (
        <img 
            style={
                {display: 'block',
                width: '250px',
                height: '250px',
                objectFit: 'contain',
                margin: '0 auto'}}
            src={errorImg}
            alt='error'/>
    );
}

export default ErrorPage;