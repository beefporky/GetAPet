import { server } from "../test/mocks/server";
import { vi } from "vitest";
import { cleanup } from "@testing-library/react";
import { getOrganization, getOrganizations } from "./organization";
import { organizationsResponse } from "../test/mocks/organizations/organizationsResponse";
import { organizationResponse } from "../test/mocks/organizations/organizationResponse";

describe("organization service", () => {
    beforeAll(() => {
        server.listen();
    });

    afterEach(() => {
        server.resetHandlers();
        cleanup();
    });

    afterAll(() => {
        server.close();
        vi.clearAllMocks();
    });

    it("should test getOrganizations", async () => {
        const filter = {
            name: 'test',
        }
        const result = await getOrganizations(filter);

        expect(result).toEqual(organizationsResponse);
    });

    it("should test getOrganization", async () => {
        const result = await getOrganization("TX2415");
        
        expect(result).toEqual(organizationResponse.organization);
    });


})