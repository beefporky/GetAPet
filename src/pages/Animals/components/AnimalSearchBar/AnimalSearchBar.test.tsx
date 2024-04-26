import { cleanup, screen } from '@testing-library/react';
import { render, setupQueryClient } from "../../../../test/test-utils";
import { RouteObject, RouterProvider, createBrowserRouter, useSubmit } from "react-router-dom";
import { routesConfig } from '../../../../routes';
import { vi } from 'vitest';
import { server } from '../../../../test/mocks/server';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';

describe("AnimalSearchBar", () => {
    let queryClient: QueryClient;

    beforeEach(() => {
        queryClient = setupQueryClient();
    });

    beforeAll(() => {
        server.listen();
        // mock the token valid function
        vi.mock('../../../../utils/auth', async (isTokenValid) => {
            const mod = await isTokenValid<typeof import('../../../../utils/auth')>()
            return {
                ...mod,
                isTokenValid: vi.fn(() => true)
            }
        });
    });

    afterEach(() => {
        server.resetHandlers();
        cleanup();
    });

    afterAll(() => {
        server.close();
    });

    it("should render the AnimalSearchBar and search", async () => {
        const searchSample = 'mimi';
        // mock the submit function
        vi.mock('react-router-dom', async (importOriginal) => {
            const actual = await importOriginal<Promise<object>>();
            return {
                ...actual,
                // useSubmit: vi.fn(() => vi.fn(() => { }))
                useSubmit: vi.fn(() => vi.fn((params) => {
                    const searchSample = 'mimi';
                    expect(params.name).toEqual(searchSample)
                }))
            }
        })
        // we use createBrowserRouter instead of createMemoryRouter since <Link> components use the context api which is not available in the memory router
        const router = createBrowserRouter(routesConfig as RouteObject[]);

        // const submit = useSubmit();
        const { container } = render(<RouterProvider router={router} />, { queryClient })

        // navigate to animals page
        const animalsLink = screen.getByText('Animals');
        await userEvent.click(animalsLink);
        const loading = screen.getByText('Loading');
        expect(loading).toBeInTheDocument();

        // use waitFor to get the result of the query
        await waitFor(async () => {
            const searchContainer = container.querySelector('div[class*="searchContainer"');
            const searchInput = searchContainer!.querySelector('input');
            const searchButton = searchContainer!.querySelector('button');
            await userEvent.type(searchInput!, searchSample);
            await userEvent.click(searchButton!)

            expect(useSubmit).toHaveBeenCalled();
            expect(container.querySelector('div[class*="searchContainer"')).toBeInTheDocument();
        });
    });
})