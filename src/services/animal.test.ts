import { getAnimal, getAnimalBreeds, getAnimalTypes, getAnimals } from "./animal"
import { animalsResponse } from "../test/mocks/animals/animals";
import { server } from "../test/mocks/server";
import { vi } from "vitest";
import { cleanup } from "@testing-library/react";
import { animalDetailResponse } from "../test/mocks/animals/animalDetails";
import { animalBreedsResponse } from "../test/mocks/animals/animalBreeds";
import { animalTypesResponse } from "../test/mocks/animals/animalTypes";

describe("animal service", () => {
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

    it("should test getAnimals", async () => {
        const filter = {
            name: 'test',
            sort: '-recent',
            type: 'dog'
        }
        const result = await getAnimals(filter);

        expect(result).toEqual(animalsResponse);
    });

    it("should test getAnimalTypes", async () => {
        const result = await getAnimalTypes();

        expect(result).toEqual(animalTypesResponse);
    });

    it("should test getAnimalBreeds", async () => {
        const result = await getAnimalBreeds('dog');

        expect(result).toEqual(animalBreedsResponse);
    });

    it("should test getAnimal", async () => {
        const result = await getAnimal(71418924);

        expect(result).toEqual(animalDetailResponse);
    });


})