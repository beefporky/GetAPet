import { ComponentPropsWithoutRef } from "react";
import classes from './Input.module.css'

type InputProps = {
    inputLabel: boolean;
} & ComponentPropsWithoutRef<'input'>

const Input = ({ inputLabel, ...props }: InputProps) => {
    return (
        <>
            {inputLabel && <label htmlFor={props.id}></label>}
            <input {...props} className={`${classes.input} ${props.className || ""}`} />
        </>
    )
}

export default Input