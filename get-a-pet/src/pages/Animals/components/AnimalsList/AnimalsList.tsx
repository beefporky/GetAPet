import { useAnimals } from "../../../../store/animals-context"
import AnimalItem from "../AnimalItem/AnimalItem";
import { type Animal } from "../../../../models/Animal";
import classes from './AnimalsList.module.css'
import Button from "../../../../components/ui/Button";
import { useNavigation } from "react-router-dom";

const AnimalsList = () => {
    const { animals, pagination } = useAnimals();
    const nextPage = pagination.current_page + 1;
    const loadMoreUrl = `/animals?page=${nextPage}`
    const { state } = useNavigation();

    // TODO: add sorting
    return (
        <div className={classes.listContainer}>
            <ul className={state === 'loading' ? `${classes.list} ${classes.disabled}` : classes.list}>
                {animals.map((animal: Animal) => <AnimalItem key={animal.id} animal={animal as Animal} />)}
            </ul>
            {pagination.current_page < pagination.total_pages ? <Button textOnly={false} className={classes.loadMore} to={loadMoreUrl}>Load More</Button> : <p>No Results</p>}
        </div>
    )
}

export default AnimalsList