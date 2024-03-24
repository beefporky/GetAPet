import { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import classes from './AppLink.module.css';

type AppNavLinkType = {
    children: ReactNode;
    isNav: boolean;
} & ComponentPropsWithoutRef<typeof NavLink>

type AppLinkType = {
    children: ReactNode;
} & ComponentPropsWithoutRef<typeof Link>

type AppLinkProps = AppNavLinkType | AppLinkType;

const AppLink = ({ children, ...props }: AppLinkProps) => {
    if ("isNav" in props && props.isNav) {
        return <NavLink className={({ isActive }) => isActive && props.isNav ? classes.active : undefined} to={props.to} end>{children}</NavLink>
    } else {
        return <Link to={props.to} >{children}</Link>
    }
}

export default AppLink