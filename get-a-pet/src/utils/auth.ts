import { redirect } from "react-router-dom";

export const getToken = () => {
    return localStorage.getItem('token');
}

export const revokeToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('expires_in');
}

export async function loader() {
    if (!getToken()) {
        return redirect('/login');
    }
}

export function hasToken() {
    return localStorage.getItem('token') ? true : false;
}

export function isTokenValid(pathname: string) {
    const existingToken = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('expiration')
    const newDate = new Date();
    if (existingToken && tokenExpiration && new Date(tokenExpiration) > newDate) {  
        return true;
    }
    else {
        debugger
        if (pathname !== '/login') {
            localStorage.setItem('prevPath', pathname);
        }
        return false;
    }
}