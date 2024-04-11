import { type Animal } from "../../../../models/Animal"
import classes from './AnimalItem.module.css'
import animalPlaceHolder from '../../../../assets/animal-placeholder.png'

type AnimalItemProps = {
    animal: Animal;
}

const AnimalItem = ({ animal }: AnimalItemProps) => {
    const img = animal.photos.length > 0 ? animal.photos[0].medium : animalPlaceHolder;
    return (
        <li className={classes.listItem}>
            <img src={img} alt={animal.name} />
            <div className={classes.itemDetails}>
                <div className={classes.text}>
                    <h3>{animal.name}</h3>
                    <p className={classes.animalType}>{animal.type}</p>
                    <p>{animal.breeds.primary}</p>
                    <p>{animal.age}</p>
                </div>
            </div>
        </li>
    )
}

export default AnimalItem