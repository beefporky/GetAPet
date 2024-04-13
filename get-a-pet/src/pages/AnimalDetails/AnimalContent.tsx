import { Animal } from "../../models/Animal";
import { Photo } from '../../models/Animal';
import animalPlaceHolder from '../../assets/animal-placeholder.png';
import classes from './AnimalDetails.module.css';
import Chip from "../../components/ui/Chip/Chip";
import ImageGallery from "react-image-gallery";

type AnimalContentProps = {
    animal: Animal;
}

const AnimalContent = ({ animal }: AnimalContentProps) => {
    const animalData = animal;
    let photos;
    if (animalData.photos.length > 0) {
        photos = animalData.photos.map((photo: Photo) => {
            return {
                original: photo.full,
                thumbnail: photo.small
            }
        });
    } else {
        photos = [{
            original: animalPlaceHolder,
            thumbnail: animalPlaceHolder
        }]
    }
    // TODO: add video support. This id has a video provided 71334058
    return (
        <section className={classes.animalContent}>
            <ImageGallery items={photos} />
            <div className={classes.divider}></div>
            <article className={classes.animalDetails}>
                <h2>{animalData.name}</h2>
                <h3>{animalData.age}</h3>
                <div className={classes.contentDivider}></div>
                <ul className={classes.animalSpecs}>
                    <li><Chip>{`${animalData.breeds.primary} ${animalData.breeds.secondary || ''}`}</Chip></li>
                    <li><Chip>{animalData.gender}</Chip></li>
                    <li><Chip>{animalData.size}</Chip></li>
                    <li><Chip>{animalData.coat}</Chip></li>
                    <li><Chip>{animalData.status}</Chip></li>
                </ul>
                <div className={classes.contentDivider}></div>
                <p>{animalData.description}</p>
                <h3>Animal Contact</h3>
                <address>
                    <p>{animalData.contact.address.address1}</p>
                    <p>{animalData.contact.address.city}, {animalData.contact.address.state} {animalData.contact.address.postcode}</p>
                    <a href={`mailto:${animalData.contact.email}`}>{animalData.contact.email}</a>
                    <p>{animalData.contact.phone}</p>
                </address>
            </article>
        </section>

    )
}

export default AnimalContent