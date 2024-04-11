import classes from './Header.module.css';
import AppLink from "../../components/ui/AppLink/AppLink";
import { IoMenuSharp, IoCloseSharp } from "react-icons/io5";
import { useState } from 'react';

const Header = () => {
    const [menuActive, setMenuActive] = useState(false);

    function toggleMenuActive() {
        setMenuActive(prevState => !prevState);
    }

    const links = [{
        name: 'Home',
        link: '/',
        isNav: true
    }, {
        name: 'Animals',
        link: '/animals',
        isNav: true
    }, {
        name: 'Organizations',
        link: '/organizations',
        isNav: true
    }];

    function handleLinkClick() {
        setMenuActive(prevState => !prevState);
    }
    return (
        <header className={classes.header}>
            {/* <div className='tilt'>
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
                </svg>
            </div> */}
            <div className={classes.mobileBtn} onClick={toggleMenuActive}>{!menuActive ? <IoMenuSharp /> : <IoCloseSharp />}</div>
            <h1 className={classes.headerText}>Get a Pet</h1>
            <nav className={classes.nav}>
                <ul className={menuActive ? [classes.list, classes.active].join(' ') : classes.list}>
                    {
                        links.map(link => <li><AppLink isNav={link.isNav} to={link.link} onClick={handleLinkClick}>{link.name}</AppLink></li>)
                    }
                </ul>
            </nav>
            <div></div>
        </header >
    )
}

export default Header