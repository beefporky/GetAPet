import { cleanup, screen } from '@testing-library/react';
import { render, setupQueryClient } from "../../../test/test-utils";
import { RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";
import { routesConfig } from '../../../routes';
import { vi } from 'vitest';
import { server } from '../../../test/mocks/server';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';
import { animalsResponse } from '../../../test/mocks/animals/animals';

describe("AnimalDetails", () => {
    let queryClient: QueryClient;

    beforeEach(() => {
        queryClient = setupQueryClient();
    });

    beforeAll(() => {
        server.listen();
        // mock the token valid function
        vi.mock('../../../utils/auth', async (isTokenValid) => {
            const mod = await isTokenValid<typeof import('../../../utils/auth')>()
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

    it("should render the AnimalDetailsPage", async () => {
        // we use createBrowserRouter instead of createMemoryRouter since <Link> components use the context api which is not available in the memory router
        const router = createBrowserRouter(routesConfig as RouteObject[]);

        render(<RouterProvider router={router} />, { queryClient })

        // navigate to animals page
        const animalsLink = screen.getByText('Animals');
        await userEvent.click(animalsLink);
        const loading = screen.getByText('Loading');

        expect(loading).toBeInTheDocument();
        // use waitFor to get the result of the query
        await waitFor(async () => {
            const animalItem = screen.getByText(animalsResponse.animals[0].name);
            await userEvent.click(animalItem);
            await waitFor(async () => {
                const name = screen.getByText(animalsResponse.animals[0].name);
                const images = screen.getAllByRole('img');
                expect(name).toBeInTheDocument();
                // 3 images and 3 thumbnails
                expect(images.length).toEqual(6);
            })
        });
    });
})