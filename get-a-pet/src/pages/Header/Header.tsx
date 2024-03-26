import classes from './Header.module.css';
import AppLink from "../../components/ui/AppLink/AppLink";

const Header = () => {
    return (
        <header className={classes.header}>
            <div className="tilt">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
                </svg>
            </div>
            <h1>Get a Pet</h1>
            <nav className={classes.nav}>
                <ul className={classes.list}>
                    <li><AppLink isNav={true} to="/">Home</AppLink></li>
                    <li><AppLink isNav={true} to="/animals">Animals</AppLink></li>
                    <li><AppLink isNav={true} to="/organizations">Organizations</AppLink></li>
                </ul>
            </nav>
        </header >
    )
}

export default Header