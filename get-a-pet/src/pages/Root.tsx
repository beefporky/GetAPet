import Header from './Header/Header'
import { Outlet, redirect } from 'react-router-dom'
import { Suspense, useEffect } from "react"
import Loading from "../components/ui/Loading/Loading"
import { defer, Await, useLoaderData } from 'react-router-dom';
import { useAuth } from "../store/auth-context";
import { authenticate, type TokenType } from '../services/auth'
import AnimalsContextProvider from '../store/animals-context';

type TokenData = {
    token: TokenType;
}

const Root = () => {
    const { setBearerToken } = useAuth();
    const { token } = useLoaderData() as Promise<TokenData>;
    useEffect(() => {
        if (token) {
            token.then((resolvedToken: TokenType) => {
                setBearerToken(resolvedToken);
            });
        }
    }, [token]);

    return (
        <AnimalsContextProvider>
            <Header />
            <Suspense fallback={<Loading />}>
                <Await resolve={token}>
                    <Outlet />
                </Await>
            </Suspense>
        </AnimalsContextProvider>
    )
}

export default Root

export function loader() {
    return defer({
        token: authenticate()
    })
}