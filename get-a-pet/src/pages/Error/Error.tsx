import { useRouteError } from "react-router-dom"

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
        message = error.data.message;
    }

    if (error.status === 404) {
        title = 'Not found!';
        message = 'Could not find resource or page.';
    }

    if (error.status === 401) {
        title = 'Unauthorized!';
        message = 'You are not authorized to access this page. Please check your credentials.';
    }
    return (
        <div>
            <h1>{title}</h1>
            <p>{message}</p>
        </div>
    )
}

export default ErrorPage