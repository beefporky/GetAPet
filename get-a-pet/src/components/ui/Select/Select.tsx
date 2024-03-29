import { ComponentPropsWithoutRef, ReactNode } from "react"
import classes from './Select.module.css'

type SelectProps = {
    selectLabel?: string;
    children: ReactNode;
} & ComponentPropsWithoutRef<'select'>

const Select = ({ selectLabel, ...props }: SelectProps) => {
    return (
        <div className={classes.selectContainer}>
            {selectLabel ? <label htmlFor={props.id}>{selectLabel}</label> : null}
            <select {...props} className={classes.select}>
                {props.children}
            </select>
        </div>
    )
}

export default Select