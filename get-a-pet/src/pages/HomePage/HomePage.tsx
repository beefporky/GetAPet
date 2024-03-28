import { useNavigate } from "react-router-dom";
const HomePage = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    if (!token) {
        navigate('/login', { replace: true, state: { from: '/' } });
    }
    return (
        <main>
        </main>
    )
}

export default HomePage
