import { type Animal } from "../../models/Animal"
import classes from './AnimalItem.module.css'
import animalPlaceHolder from '../../assets/animal-placeholder.png'

type AnimalItemProps = {
    animal: Animal;
}
const AnimalItem = ({ animal }: AnimalItemProps) => {
    const img = animal.photos.length > 0 ? animal.photos[0].medium : animalPlaceHolder;
    return (
        <li>
            <div className={classes.item}>
                <img src={img} alt={animal.name} />
                <div className={classes.itemDetails}>
                    <div className={classes.text}>
                        <h3>Name: {animal.name}</h3>
                        <p>Type: {animal.type}</p>
                        <p>Primary Breed: {animal.breeds.primary}</p>
                        <p>Mixed Breed: {animal.breeds.mixed ? "Yes" : "No"}</p>
                        {animal.breeds.mixed && <p>Secondary Breed: {animal.breeds.secondary}</p>}
                        <p>Age: {animal.age}</p>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default AnimalItem