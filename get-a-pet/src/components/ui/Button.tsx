import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type ButtonProps = {
    children: ReactNode;
    textOnly: boolean;
} & ComponentPropsWithoutRef<'button'>

type LinkTypeProps = {
    children: ReactNode;
    to: string;
} & ComponentPropsWithoutRef<typeof Link>

type PropType = ButtonProps | LinkTypeProps;

const Button = ({ children, textOnly, ...props }: PropType) => {
    if ("to" in props) {
        return <Link to={props.to}>{children}</Link>
    } else {
        return <button {...props}>{children}</button>
    }
}

export default Button