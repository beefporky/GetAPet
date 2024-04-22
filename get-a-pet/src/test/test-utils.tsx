import React, { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AuthContextProvider from "../store/auth-context";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { RenderOptions, render } from '@testing-library/react';
import AnimalsContextProvider from '../store/animals-context';
import ModalContextProvider from '../components/ui/Modal/modal-context';
import userEvent from '@testing-library/user-event';

const queryClient = new QueryClient();

type ExtendedRenderOptions = {
    initialEntries?: string[],
    queryClient?: QueryClient
} & RenderOptions;

// const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
//     return (<QueryClientProvider client={queryClient}>
//         <AuthContextProvider>
//             <MemoryRouter initialEntries={['/']}>
//                 <AnimalsContextProvider>
//                     <ModalContextProvider>
//                         {children}
//                     </ModalContextProvider>
//                 </AnimalsContextProvider>
//             </MemoryRouter>
//         </AuthContextProvider>
//     </QueryClientProvider>)
// }

const customRender = (
    ui: ReactElement,
    options?: Omit<ExtendedRenderOptions, 'wrapper'>
) => {
    const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
        return (<QueryClientProvider client={options?.queryClient ?? queryClient}>
            <AuthContextProvider>
                {/* <MemoryRouter initialEntries={options?.initialEntries ?? ['/']}> */}
                <AnimalsContextProvider>
                    <ModalContextProvider>
                        {children}
                    </ModalContextProvider>
                </AnimalsContextProvider>
                {/* </MemoryRouter> */}
            </AuthContextProvider>
        </QueryClientProvider>)
    }

    return render(ui, { wrapper: AllTheProviders, ...options });
}

// const RenderWithRouterProvider = ({ children }: { children: React.ReactNode }) => {
//     return (<QueryClientProvider client={queryClient}>
//         <AuthContextProvider>
//             <BrowserRouter>
//                 <AnimalsContextProvider>
//                     <ModalContextProvider>
//                         {children}
//                     </ModalContextProvider>
//                 </AnimalsContextProvider>
//             </BrowserRouter>
//         </AuthContextProvider>
//     </QueryClientProvider>)
// }

// const renderWithRouter = (ui: ReactElement, { route = '/' } = {}) => {
//     window.history.pushState({}, 'Test page', route)

//     return {
//         user: userEvent.setup(),
//         ...render(ui, { wrapper: RenderWithRouterProvider })
//     }
// }

export * from '@testing-library/react'
export { customRender as render, /*renderWithRouter */ }