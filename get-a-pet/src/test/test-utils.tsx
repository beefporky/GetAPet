import React, { ReactElement } from 'react';
import { QueryClient, QueryClientConfig, QueryClientProvider } from "@tanstack/react-query"
import AuthContextProvider from "../store/auth-context";
import { RenderOptions, render } from '@testing-library/react';
import AnimalsContextProvider from '../store/animals-context';
import ModalContextProvider from '../components/ui/Modal/modal-context';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false
        }
    }
});

type ExtendedRenderOptions = {
    initialEntries?: string[],
    queryClient?: QueryClient
} & RenderOptions;

const customRender = (
    ui: ReactElement,
    options?: Omit<ExtendedRenderOptions, 'wrapper'>
) => {
    const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
        return (
            <AuthContextProvider>
                <QueryClientProvider client={options?.queryClient ?? queryClient}>
                    <AnimalsContextProvider>
                        <ModalContextProvider>
                            {children}
                        </ModalContextProvider>
                    </AnimalsContextProvider>
                </QueryClientProvider>
            </AuthContextProvider>
        )
    }

    return render(ui, { wrapper: AllTheProviders, ...options });
}

export function setupQueryClient(config?: QueryClientConfig | undefined) {
    if (!config) {
        return new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                },
            },
        })
    }
    return new QueryClient(config)
}

export * from '@testing-library/react'
export { customRender as render }