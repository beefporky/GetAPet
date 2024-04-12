import { useAnimals } from "../../../../store/animals-context"
import AnimalItem from "../AnimalItem/AnimalItem";
import { type Animal } from "../../../../models/Animal";
import classes from './AnimalsList.module.css'
import Button from "../../../../components/ui/Button";
import { useNavigation, useSubmit } from "react-router-dom";
import { useState } from "react";
import Dropdown, { DropdownOption } from "../../../../components/ui/Dropdown/Dropdown";
import { MdOutlineSort } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import useCustomEffect from "../../../../hooks/useCustomEffect";

type AnimalsListProps = {
    filterFormData: object;
    toggleFilterForm: () => void;
}

const DEFAULT_SORT = 'recent';
const DEFAULT_SORT_LABEL = 'Newest Addition';

const AnimalsList = ({ filterFormData, toggleFilterForm }: AnimalsListProps) => {
    const { animals, pagination } = useAnimals();
    const nextPage = pagination.current_page + 1;
    const { state } = useNavigation();
    const [sortValue, setSortValue] = useState(DEFAULT_SORT);
    const loadMoreUrl = `/animals?sort=${sortValue}&page=${nextPage}`
    const sortOptions: DropdownOption[] = [{
        label: 'Newest Addition',
        value: 'recent',
    }, {
        label: 'Oldest Addition',
        value: '-recent',
    }];
    const submit = useSubmit();

    useCustomEffect(() => {
        const data = { ...filterFormData, sort: sortValue };
        submit(data);

    }, [sortValue]);

    function handleSortChange(option: string) {
        setSortValue(option);
    }
    return (
        <div className={classes.listContainer}>
            <div className={classes.sortAndFilter}>
                <Button className={classes.filterButton} textOnly={false} icon={<FaFilter />} onClick={toggleFilterForm}>Filters</Button>
                <Dropdown name="Sort" options={sortOptions} selectLabel={DEFAULT_SORT_LABEL} value={sortValue} closeOnSelect onChange={handleSortChange} icon={<MdOutlineSort />}></Dropdown>
            </div>
            <ul className={state === 'loading' ? `${classes.list} ${classes.disabled}` : classes.list}>
                {animals.map((animal: Animal) => <AnimalItem key={animal.id} animal={animal as Animal} />)}
            </ul>
            {pagination.current_page < pagination.total_pages ? <Button textOnly={false} className={classes.loadMore} to={loadMoreUrl}>Load More</Button> : <p>No Results</p>}
        </div>
    )
}

export default AnimalsList