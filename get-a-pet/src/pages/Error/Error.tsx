import { useRouteError } from "react-router-dom"
import classes from './Error.module.css';

export type PageError = {
    status: number;
    message: string;
}
type RouteError = {
    status: number;
    data: {
        message: string;
    }

}
const ErrorPage = () => {
    const error = useRouteError() as RouteError;
    let title = 'An error occurred!';
    let message = 'Something went wrong!';
    if (error.status === 500) {
        title = 'Error 500: Something went wrong with the server.'
        message = error.data.message;
    }

    if (error.status === 404) {
        title = 'Error 404: Page Not Found';
        message = 'Sorry we could not find that page or resource.';
    }

    if (error.status === 401) {
        title = 'Error 401: Unauthorized!';
        message = 'You are not authorized to access this page. Please check your credentials.';
    }
    return (
        <div className={classes.errorDiv}>
            <h1>{title}</h1>
            <p>{message}</p>
        </div>
    )
}

export default ErrorPage