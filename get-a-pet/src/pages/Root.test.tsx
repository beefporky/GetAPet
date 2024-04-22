import { cleanup, screen } from '@testing-library/react';
import { render } from '../test/test-utils';
import Root from './Root';
import { userEvent } from '@testing-library/user-event';
import App from '../App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routesConfig } from '../routes';

describe("Root", () => {
    afterEach(() => {
        cleanup();
    });

    it("should render the Root Layout with the Header", () => {
        // Arrange
        const router = createBrowserRouter(routesConfig, {
            initialEntries: ['/animals']
        });

        render(<RouterProvider router={router} />)
        // render(<Root />);

        // Act 
        const title = screen.getByText('Get a Pet');
        const links = screen.getAllByRole('link');
        const linkTexts = ['Home', 'Animals', 'Organizations'];
        const navRoutes = ['/', '/animals', '/organizations'];

        // Assert
        expect(title).toBeInTheDocument();
        links.forEach((link) => {
            const href = link.getAttribute('href');
            expect(linkTexts.includes(link.innerHTML)).toEqual(true);
            expect(navRoutes.includes(href!)).toEqual(true);
        })
    });

})