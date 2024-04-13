import Header from './Header/Header'
import { Outlet, redirect } from 'react-router-dom'
import { defer } from 'react-router-dom';
import { authenticate } from '../services/auth'
import AnimalsContextProvider from '../store/animals-context';
import Modal from '../components/ui/Modal/Modal';
import ModalContextProvider from '../components/ui/Modal/modal-context';
import { isTokenValid } from '../utils/auth';

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

type Request = {
    request: {
        url: string;
    }
}

export function loader({ request }: Request) {
    const newUrl = new URL(request.url);
    const pathname = newUrl.pathname + newUrl.search;
    if (!isTokenValid(pathname)) {
        return redirect('/login');
    }
    return defer({
        token: authenticate()
    })
}