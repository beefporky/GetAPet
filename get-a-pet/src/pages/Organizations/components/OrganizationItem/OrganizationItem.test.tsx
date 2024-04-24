import { cleanup, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { organizationItem } from "../../../../test/mocks/organizations/organizationItem";
import { Organization } from "../../../../models/Organization";
import OrganizationItem from "./OrganizationItem";

describe("OrganizationItem", () => {
    afterEach(() => {
        cleanup();
    });

    it("should show an OrganizationItem with details", async () => {
        const organization: Organization = organizationItem;
        const RouterWrapper = ({ children }: { children: React.ReactNode }) => {
            return (
                <MemoryRouter initialEntries={['/organizations']}>
                    {children}
                </MemoryRouter>
            )
        }
        render(<OrganizationItem organization={organization} />, { wrapper: RouterWrapper });

        const image = screen.getByRole('img');
        const name = screen.getByText(organization.name);
        const missionStatement = screen.getByText(organization.mission_statement, {
            exact: false
        });
        const city = screen.getByText(organization.address.city, {
            exact: false
        });
        const state = screen.getByText(organization.address.state, {
            exact: false
        });
        const country = screen.getByText(organization.address.country, {
            exact: false
        });
        expect(image).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(missionStatement).toBeInTheDocument();
        expect(city).toBeInTheDocument();
        expect(state).toBeInTheDocument();
        expect(country).toBeInTheDocument();
    });
});