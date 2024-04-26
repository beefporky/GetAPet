import { cleanup, screen } from "@testing-library/react";
import App from "./App";
import { server } from "./test/mocks/server";
import { render } from "./test/test-utils";

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

    it("should test the routes and landing page", async () => {
        const { container } = render(<App />);
        expect(screen.getByText('The Best Pets Available')).toBeInTheDocument();

        const links = container.querySelectorAll('nav a');
        const linkTexts = ['Home', 'Animals', 'Organizations'];
        const navRoutes = ['/', '/animals', '/organizations'];
        links.forEach((link) => {
            const href = link.getAttribute('href');
            expect(linkTexts.includes(link.innerHTML)).toEqual(true);
            expect(navRoutes.includes(href!)).toEqual(true);
        });
    });
})