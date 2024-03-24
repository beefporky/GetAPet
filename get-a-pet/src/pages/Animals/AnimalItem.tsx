import { type Animal } from "../../models/Animal"
type AnimalItemProps = {
    animal: Animal;
}
const AnimalItem = ({ animal }: AnimalItemProps) => {
    return (
        <li>
            <h3>Name: {animal.name}</h3>
            <p>Type: {animal.type}</p>
            <p>Species: {animal.species}</p>
            <p>{animal.id}</p>
        </li>
    )
}

export default AnimalItem