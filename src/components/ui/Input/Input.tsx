import { ComponentPropsWithoutRef, forwardRef } from "react";
import classes from './Input.module.css'

type InputProps = {
    inputLabel: boolean;
} & ComponentPropsWithoutRef<'input'>

type InputRef = HTMLInputElement;

const Input = forwardRef<InputRef, InputProps>(function Input({ inputLabel, ...props }: InputProps, inputRef) {
    return (
        <>
            {inputLabel && <label htmlFor={props.id}></label>}
            <input {...props} className={`${classes.input} ${props.className || ""}`} ref={inputRef} />
        </>
    )
})

export default Input