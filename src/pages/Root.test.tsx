import { cleanup, screen } from '@testing-library/react';
import { render } from '../test/test-utils';
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routesConfig } from '../routes';

describe("RootLayout", () => {
    afterEach(() => {
        cleanup();
    });

    it("should render the RootLayout Layout with the Header", () => {
        // Arrange
        const router = createBrowserRouter(routesConfig as RouteObject[]);

        render(<RouterProvider router={router} />)

        // Act 
        const title = screen.getByText('Get a Pet');


        // Assert
        expect(title).toBeInTheDocument();

    });

})