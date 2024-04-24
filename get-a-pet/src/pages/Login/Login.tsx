import { Await, defer, redirect, useLoaderData, useNavigate } from "react-router-dom"
import { TokenType, authenticate } from "../../services/auth"
import { isTokenValid } from "../../utils/auth"
import { useAuth } from "../../store/auth-context"
import { Suspense } from "react"
import Loading from "../../components/ui/Loading/Loading"
import { Request } from "../../utils/network"

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
        console.log('dito')
        navigate(prevPath || '/', { replace: true });
    }

    return <Suspense fallback={<Loading />}>
        <Await resolve={token}>
            {(tokenData) => {
                console.log('over')
                setBearerToken(tokenData);
                redirectToPreviousPath();
                return <></>
            }}
        </Await>
    </Suspense>
}

export default Login

export function loader({ request }: Request) {
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