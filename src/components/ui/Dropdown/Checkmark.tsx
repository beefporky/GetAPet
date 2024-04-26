import classes from './Checkmark.module.css'

const Checkmark = () => {
    return (
        <div className={classes.checkmark}>
            <div className={classes.checkmark_circle}></div>
            <div className={classes.checkmark_stem}></div>
            <div className={classes.checkmark_kick}></div>
        </div>
    )
}

export default Checkmark