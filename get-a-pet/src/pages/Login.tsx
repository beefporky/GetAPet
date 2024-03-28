import { defer, redirect, useLoaderData, useLocation, useNavigate, useNavigation } from "react-router-dom"
import { TokenType, authenticate } from "../services/auth"
import { hasToken } from "../utils/auth"
import { useAuth } from "../store/auth-context"
import { useEffect } from "react"
import Loading from "../components/ui/Loading/Loading"

type TokenData = {
    token: TokenType;
}

const Login = () => {
    const navigate = useNavigate();
    const { setBearerToken } = useAuth();
    const { token } = useLoaderData() as Promise<TokenData>;
    useEffect(() => {
        if (token) {
            token.then((resolvedToken: TokenType) => {
                setBearerToken(resolvedToken);
            });
        }
    }, [token]);
    if (hasToken()) {
        const prevPath = localStorage.getItem('prevPath');
        localStorage.removeItem('prevPath');
        navigate(prevPath || '/', { replace: true });
    }
    return (
        <Loading />
    )
}

export default Login

export function loader() {
    return defer({
        token: authenticate()
    })
}