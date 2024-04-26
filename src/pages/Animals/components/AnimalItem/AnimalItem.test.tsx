import { cleanup, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { render } from "@testing-library/react";
import { animalItem } from "../../../../test/mocks/animals/animalItem";
import { Animal } from "../../../../models/Animal";
import AnimalItem from "./AnimalItem";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("AnimalItem", () => {
    afterEach(() => {
        cleanup();
    });

    it("should show an AnimalItem with details", async () => {
        vi.mock('react-router-dom', async (importOriginal) => {
            const actual = await importOriginal<Promise<object>>();
            return {
                ...actual, useNavigate: vi.fn(() => vi.fn((pathname) => {
                    expect(pathname).toEqual('/animals/71418924')
                }))
            }
        });
        const animal: Animal = animalItem;
        const RouterWrapper = ({ children }: { children: React.ReactNode }) => {
            return (
                <MemoryRouter initialEntries={['/animals']}>
                    {children}
                </MemoryRouter>
            )
        }
        render(<AnimalItem animal={animal} />, { wrapper: RouterWrapper });

        const image = screen.getByRole('img');
        const name = screen.getByText(animal.name);
        const breed = screen.getByText(animal.breeds.primary);
        const age = screen.getByText(animal.age);

        expect(image).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(age).toBeInTheDocument();
        expect(breed).toBeInTheDocument();

        const listItem = screen.getByRole('listitem');
        await userEvent.click(listItem);
        expect(useNavigate).toHaveBeenCalled();
    });
});