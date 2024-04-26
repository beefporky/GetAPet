import Header from './Header/Header'
import { Outlet, redirect } from 'react-router-dom'
import { defer } from 'react-router-dom';
import { authenticate } from '../services/auth'
import AnimalsContextProvider from '../store/animals-context';
import ModalContextProvider from '../components/ui/Modal/modal-context';
import { isTokenValid } from '../utils/auth';
import { Request } from '../utils/network';
import Footer from './Footer/Footer';

const RootLayout = () => {
    return (
        <AnimalsContextProvider>
            <ModalContextProvider>
                <Header />
                <Outlet />
                <Footer />
            </ModalContextProvider>
        </AnimalsContextProvider>
    )
}

export default RootLayout

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