import Select from '../../../../components/ui/Select/Select'
import { useAnimals } from '../../../../store/animals-context'
import classes from './AnimalFilterForm.module.css'
import { Form, useSubmit } from 'react-router-dom';
import { DEFAULT_ANIMAL_AGE, DEFAULT_ANIMAL_GENDER, DEFAULT_ANIMAL_SIZE } from '../../../../utils/constants';

const AnimalFilterForm = () => {
    const { animalTypes, breeds } = useAnimals();
    const submit = useSubmit();

    function onFilterChange(event: React.ChangeEvent<HTMLFormElement>) {
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);
        const dataWithPage = { ...data, page: 1 };
        submit(dataWithPage);
    }

    return (
        <aside className={classes.aside}>
            <fieldset className={classes.filters}>
                <legend>Filters</legend>
                <Form method='get' action='/animals' name='filterForm' onChange={onFilterChange}>
                    <Select name="type" id="type" selectLabel="Type">
                        {animalTypes.map((animalType) => <option key={animalType.name} value={animalType.name}>{animalType.name}</option>)}
                    </Select>
                    <Select name="breed" id="breed" selectLabel="Breed">
                        {breeds.map((breed) => <option key={breed.name} value={breed.name}>{breed.name}</option>)}
                    </Select>
                    <Select name="age" id="age" selectLabel="Age">
                        {DEFAULT_ANIMAL_AGE.map((age) => <option key={age} value={age}>{age}</option>)}
                    </Select>
                    <Select name="size" id="size" selectLabel="Size">
                        {DEFAULT_ANIMAL_SIZE.map((size) => <option key={size} value={size}>{size}</option>)}
                    </Select>
                    <Select name="gender" id="gender" selectLabel="Gender">
                        {DEFAULT_ANIMAL_GENDER.map((gender) => <option key={gender} value={gender}>{gender}</option>)}
                    </Select>
                    <ul>
                        <li>
                            <label htmlFor="good_with_children">Good with children</label>
                            <input type="checkbox" name="good_with_children" id="good_with_children" value="true" />
                        </li>
                        <li>
                            <label htmlFor="good_with_dogs">Good with dogs</label>
                            <input type="checkbox" name="good_with_dogs" id="good_with_dogs" value="true" />
                        </li>
                        <li>
                            <label htmlFor="good_with_cats">Good with cats</label>
                            <input type="checkbox" name="good_with_cats" id="good_with_cats" value="true" />
                        </li>
                    </ul>
                </Form>
            </fieldset>
        </aside>
    )
}

export default AnimalFilterForm