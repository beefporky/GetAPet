import { ComponentPropsWithoutRef } from "react";
import classes from './Input.module.css'

type InputProps = {
    inputLabel: boolean;
} & ComponentPropsWithoutRef<'input'>

const Input = (props: InputProps) => {
    return (
        <>
            {props.inputLabel && <label htmlFor={props.id}></label>}
            <input {...props} className={`${classes.input} ${props.className || ""}`} />
        </>
    )
}

export default Input