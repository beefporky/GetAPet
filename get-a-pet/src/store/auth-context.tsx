import { ReactNode, createContext, useContext, useState } from "react";
import { TokenType } from "../services/auth";

type AuthValue = {
    bearerToken: string | null;
    setBearerToken: (token: TokenType) => void;
}
export const AuthContext = createContext<AuthValue>({
    bearerToken: null,
    setBearerToken: () => { }
});

type AuthProps = {
    children: ReactNode;
};

export function useAuth() {
    const props = useContext(AuthContext);

    return props;
}

export default function AuthContextProvider({ children }: AuthProps) {
    const [token, setToken] = useState(localStorage.getItem('token'));

    function handleToken(val: TokenType) {
        const expiration = new Date();
        expiration.setSeconds(expiration.getSeconds() + val.expires_in);
        localStorage.setItem('token', val.access_token);
        localStorage.setItem('expiration', expiration.toISOString());
        localStorage.setItem('expires_in', val.expires_in.toString());

        setToken(val.access_token);
    }
    const ctx = {
        bearerToken: token,
        setBearerToken: handleToken
    }

    return <AuthContext.Provider value={ctx}>
        {children}
    </AuthContext.Provider>
}