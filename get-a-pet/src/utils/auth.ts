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
    // TODO: add expiration check here to fix login issue
    if (!hasToken()) {
        localStorage.setItem('prevPath', pathname);
        return true;
    }
    return false;
}