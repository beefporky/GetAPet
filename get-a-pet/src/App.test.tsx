import { cleanup, render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { server } from "./test/mocks/server";
import { BrowserRouter, MemoryRouter, RouterProvider, createMemoryRouter } from "react-router-dom";
import { routesConfig } from "./routes";

describe('App', () => {
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

    it("should test the routes", async () => {
        render(<App />);
        expect(screen.getByText('The Best Pets Available')).toBeInTheDocument();

        // const user = userEvent.setup();
        // await user.click(screen.getByText('Animals'));
        // expect(screen.getByText('Loading')).toBeInTheDocument();

    });
})