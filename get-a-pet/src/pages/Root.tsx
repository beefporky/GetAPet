import Header from './Header/Header'
import { Outlet, redirect } from 'react-router-dom'
import { defer } from 'react-router-dom';
import { authenticate } from '../services/auth'
import AnimalsContextProvider from '../store/animals-context';
import Modal from '../components/ui/Modal/Modal';
import ModalContextProvider from '../components/ui/Modal/modal-context';

const Root = () => {
    return (
        <AnimalsContextProvider>
            <ModalContextProvider>
                <Header />
                <Outlet />
                <Modal />
            </ModalContextProvider>

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