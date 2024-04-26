import classes from './Footer.module.css'
const Footer = () => {
    return (
        <footer className={classes.footer}>
            <p>
                Powered by <span><a href='https://petfinder.com' target='_blank'>Petfinder</a></span>.
            </p>
        </footer>
    )
}

export default Footer