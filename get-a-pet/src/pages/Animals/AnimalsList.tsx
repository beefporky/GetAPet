import { useAnimals } from "../../store/animals-context"
import AnimalItem from "./AnimalItem";
import { type Animal } from "../../models/Animal";

const AnimalsList = () => {
    const { animals } = useAnimals();
    return (
        <ul>
            {animals.map((animal: Animal) => <AnimalItem key={animal.id} animal={animal as Animal} />)}
        </ul>
    )
}

export default AnimalsList