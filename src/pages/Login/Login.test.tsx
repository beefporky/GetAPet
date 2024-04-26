import { RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom"
import { routesConfig } from "../../routes"
import { render } from "../../test/test-utils";
import { vi } from "vitest";
import { authenticate } from "../../services/auth";

describe("Login", () => {
    it("should load the Login and redirect the user to the Homepage", async () => {
        const router = createBrowserRouter(routesConfig as RouteObject[]);

        render(<RouterProvider router={router} />);
        vi.mock('../../services/auth', async (importOriginal) => {
            const actual = await importOriginal<Promise<object>>();
            return {
                ...actual,
                authenticate: vi.fn()
            }
        });

        expect(authenticate).toHaveBeenCalled();
    })
})