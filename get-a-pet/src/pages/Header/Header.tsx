import classes from './Header.module.css';
import AppLink from "../../components/ui/AppLink/AppLink";

const Header = () => {
    return (
        <header className={classes.header}>
            <h1>Get A Pet</h1>
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