import { useNavigate } from "react-router-dom";
import classes from './HomePage.module.css';

const HomePage = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    if (!token) {
        navigate('/login', { replace: true, state: { from: '/' } });
    }
    return (
        <main>
            <section className={classes.mainPage}>
                <article>
                    <h3 className={classes.tagline}>The Best Pets Available</h3>
                </article>
                <img className={classes.mainImage} src="main.png" alt="" />
            </section>
        </main>
    )
}

export default HomePage
