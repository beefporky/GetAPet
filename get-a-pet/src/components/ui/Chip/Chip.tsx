import { ComponentPropsWithoutRef } from "react";
import classes from './Chip.module.css'

type ChipProps = {
    children: React.ReactNode;
} & ComponentPropsWithoutRef<'div'>;

const Chip = ({ children, ...props }: ChipProps) => {
    return (
        <div className={classes.chip} {...props}>{children}</div>
    )
}

export default Chip