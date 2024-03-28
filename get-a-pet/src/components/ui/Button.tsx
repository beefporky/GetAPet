import { ComponentPropsWithoutRef, ReactNode } from 'react';
import classes from './Button.module.css'
import { Link } from 'react-router-dom';

type ButtonProps = {
    children: ReactNode;
    textOnly: boolean;
} & ComponentPropsWithoutRef<'button'>

type LinkProps = {
    children: ReactNode;
    to: string;
} & ComponentPropsWithoutRef<typeof Link>

const Button = ({ children, textOnly, ...props }: ButtonProps | LinkProps) => {
    if ("to" in props) {
        return <Link {...props} to={props.to} className={`${classes.button} ${props.className || ""}`}>{children}</Link>
    }
    return <button {...props} className={`${classes.button} ${props.className || ""}`}>{children}</button>
}

export default Button