import { render } from "../../../test/test-utils";
import AnimalContent from "./AnimalContent";
import { animalContentResponse } from "../../../test/mocks/animals/animalContent";
import { Animal } from "../../../models/Animal";
import { screen } from '@testing-library/react'

describe("AnimalContent", () => {
    it("should render all AnimalContent including videos and images", () => {
        const animal: Animal = animalContentResponse;
        const { container } = render(<AnimalContent animal={animal} />);
        console.log('"' + animal.contact.address.city + '"')
        const name = screen.getByText(animal.name);
        const gender = screen.getByText(animal.gender);
        const status = screen.getByText(animal.status);
        const size = screen.getAllByText(animal.size);
        const contact = screen.getByText('Animal Contact');
        const email = screen.getByText(animal.contact.email);
        const images = screen.getAllByRole('img');
        const video = container.querySelector('video');

        expect(name).toBeInTheDocument();
        expect(images.length).toEqual(11);
        expect(video).toBeInTheDocument();
        expect(gender).toBeInTheDocument();
        expect(size[0]).toBeInTheDocument();
        expect(status).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(contact).toBeInTheDocument();
        if (animal.contact.address.address1) {
            expect(screen.getByText(animal.contact.address.address1)).toBeInTheDocument();
        }
    });
});