import { vi } from "vitest";
import { server } from "../../../../test/mocks/server";
import { QueryClient } from "@tanstack/react-query";
import { cleanup, screen, waitFor } from "@testing-library/react";
import { RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";
import { routesConfig } from "../../../../routes";
import { render } from "../../../../test/test-utils";
import userEvent from "@testing-library/user-event";

describe("AnimalsList", () => {
    let queryClient: QueryClient;

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
        vi.clearAllMocks();
    });

    it("should render the data for Animals List", async () => {
        const router = createBrowserRouter(routesConfig as RouteObject[]);

        const { container } = render(<RouterProvider router={router} />, { queryClient });

        const animalsLink = screen.getByText('Animals');
        await userEvent.click(animalsLink);
        const loading = screen.getByText('Loading');

        expect(loading).toBeInTheDocument();
        await waitFor(() => {
            expect(container.querySelector('div[class*="listContainer"]')).toBeInTheDocument();
            expect(container.querySelector('div[class*="sortAndFilter"]')).toBeInTheDocument();
            expect(container.querySelector('a[class*="loadMore"]')).toBeInTheDocument();
        });
    });
});