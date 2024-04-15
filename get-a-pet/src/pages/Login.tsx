import { defer, redirect, useLoaderData, useNavigate } from "react-router-dom"
import { TokenType, authenticate } from "../services/auth"
import { isTokenValid } from "../utils/auth"
import { useAuth } from "../store/auth-context"
import { useEffect } from "react"
import Loading from "../components/ui/Loading/Loading"

type TokenData = {
    token: Promise<TokenType>;
}

const Login = () => {
    const navigate = useNavigate();
    const { setBearerToken } = useAuth();
    const { token } = useLoaderData() as TokenData;

    function redirectToPreviousPath() {
        const prevPath = localStorage.getItem('prevPath');
        localStorage.removeItem('prevPath');
        navigate(prevPath || '/', { replace: true });
    }

    useEffect(() => {
        if (token) {
            token.then((resolvedToken: TokenType) => {
                setBearerToken(resolvedToken);
                redirectToPreviousPath();
            });
        }
    }, [token]);
    return (
        <Loading />
    )
}

export default Login

export function loader({ request }) {
    const newUrl = new URL(request.url);
    const pathname = newUrl.pathname + newUrl.search;
    if (isTokenValid(pathname)) {
        const prevPath = localStorage.getItem('prevPath');
        return redirect(prevPath || '/');
    }
    return defer({
        token: authenticate()
    })
}