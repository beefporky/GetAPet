import { Animal } from "../../models/Animal";
import { Photo } from '../../models/Animal';
import animalPlaceHolder from '../../assets/animal-placeholder.png';
import playIcon from '../../assets/play-icon.png';
import classes from './AnimalDetails.module.css';
import Chip from "../../components/ui/Chip/Chip";
import ImageGallery from "react-image-gallery";
import { extractVideoSrcFromHtmlEmbed } from "../../utils/utils";

type AnimalContentProps = {
    animal: Animal;
}

type MediaType = {
    original: string;
    thumbnail: string;
    isPhoto: boolean;
    vidType?: string;
}

const AnimalContent = ({ animal }: AnimalContentProps) => {
    const animalData = animal;
    let photos;
    if (animalData.photos.length > 0) {
        photos = animalData.photos.map((photo: Photo) => {
            return {
                original: photo.full,
                thumbnail: photo.small,
                isPhoto: true
            } as MediaType
        });
    } else {
        photos = [{
            original: animalPlaceHolder,
            thumbnail: animalPlaceHolder,
            isPhoto: true
        } as MediaType]
    }
    if (animalData.videos.length > 0) {
        const [vidSrc, vidType] = extractVideoSrcFromHtmlEmbed(animalData.videos[0].embed);
        photos.push({
            original: vidSrc,
            thumbnail: playIcon,
            isPhoto: false,
            vidType
        } as MediaType);
    }

    function renderMedia(item: MediaType) {
        // error 71344110
        // This id has a video provided 71334058
        if (item.isPhoto) {
            return (
                <div className={classes.imageGalleryItem}>
                    <img src={item.original} alt={animalData.name} />
                </div>
            )
        } else {
            return (
                <div className={classes.imageGalleryItem}>
                    {item.vidType === 'video' ? <video className={classes.embedVideo} controls>
                        <source src={item.original} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video> : <iframe src={item.original} title={animalData.name} className={classes.embedVideo}></iframe>}
                </div>
            )
        }
    }

    return (
        <section className={classes.animalContent}>
            <ImageGallery items={photos} showPlayButton={false} showFullscreenButton={false} renderItem={renderMedia} className={classes.imageGallery} />
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