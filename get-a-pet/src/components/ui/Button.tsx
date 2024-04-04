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
    textOnly: boolean;
} & ComponentPropsWithoutRef<typeof Link>

const Button = ({ children, textOnly, ...props }: ButtonProps | LinkProps) => {
    if ("to" in props) {
        return <Link {...props} to={props.to} className={`${!textOnly ? classes.button : classes.textButton} ${props.className || ""}`}>{children}</Link>
    }
    return <button {...props} className={`${!textOnly ? classes.button : classes.textButton} ${props.className || ""}`}>{children}</button>
}

export default Button