import { defer, redirect } from "react-router-dom"
import { authenticate } from "../services/auth"

const Login = () => {
    return (
        <div>Login</div>
    )
}

export default Login

export function loader() {
    return defer({
        token: authenticate()
    })
}