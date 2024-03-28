import Header from './Header/Header'
import { Outlet, redirect } from 'react-router-dom'
import { defer } from 'react-router-dom';
import { authenticate } from '../services/auth'
import AnimalsContextProvider from '../store/animals-context';

const Root = () => {
    return (
        <AnimalsContextProvider>
            <Header />
            <Outlet />
        </AnimalsContextProvider>
    )
}

export default Root

export function loader() {
    if (!localStorage.getItem('token')) {
        return redirect('/login');
    }
    return defer({
        token: authenticate()
    })
}