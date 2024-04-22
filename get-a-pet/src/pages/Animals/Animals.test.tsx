import { cleanup, screen } from '@testing-library/react';
import AnimalsPage from "./Animals";
import { render } from "../../test/test-utils";
// import { render } from '@testing-library/react';
import { RouterProvider, createBrowserRouter, createMemoryRouter } from "react-router-dom";
import { routesConfig } from '../../routes';
import { vi } from 'vitest';
import { server } from '../../test/mocks/server';
import userEvent from '@testing-library/user-event';

describe("Animals", () => {

    beforeAll(() => {
        server.listen();
    });

    afterEach(() => {
        server.resetHandlers();
        cleanup();
    });

    afterAll(() => {
        server.close();
    });

    it("should render the Animals page", async () => {
        // mock the token valid function
        vi.mock('../../utils/auth', async (isTokenValid) => {
            const mod = await isTokenValid<typeof import('../../utils/auth')>()
            return {
                ...mod,
                isTokenValid: vi.fn(() => true)
            }
        });

        const router = createBrowserRouter(routesConfig, {
            initialEntries: ['/animals']
        });

        render(<RouterProvider router={router} />)


        // render(<AnimalsPage />, { initialEntries: ['/animals'] })
        const animals = screen.getByText('Animals');
        const user = userEvent.setup();
        await user.click(animals);
        const loading = screen.getByText('Loading');
        // TODO: need to check the result after the loading
        // TODO: create custom query
        // TODO: test context api
        expect(loading).toBeInTheDocument();
    });
})