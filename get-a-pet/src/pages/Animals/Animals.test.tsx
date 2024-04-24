import { cleanup, screen } from '@testing-library/react';
import { render, setupQueryClient } from "../../test/test-utils";
import { RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";
import { routesConfig } from '../../routes';
import { vi } from 'vitest';
import { server } from '../../test/mocks/server';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';

describe("Animals", () => {
    let queryClient: QueryClient;

    beforeEach(() => {
        queryClient = setupQueryClient();
    });

    beforeAll(() => {
        server.listen();
        // mock the token valid function
        vi.mock('../../utils/auth', async (isTokenValid) => {
            const mod = await isTokenValid<typeof import('../../utils/auth')>()
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
        vi.clearAllMocks();
    });

    it("should render the Animals page", async () => {
        // we use createBrowserRouter instead of createMemoryRouter since <Link> components use the context api which is not available in the memory router
        const router = createBrowserRouter(routesConfig as RouteObject[]);

        render(<RouterProvider router={router} />, { queryClient })

        // navigate to animals page
        const animalsLink = screen.getByText('Animals');
        await userEvent.click(animalsLink);
        const loading = screen.getByText('Loading');

        expect(loading).toBeInTheDocument();
        // use waitFor to get the result of the query
        await waitFor(() => {
            const form = screen.getByRole('form');
            const data = form.getAttribute('name');

            expect(data).toEqual('filterForm');
        });
    });
})