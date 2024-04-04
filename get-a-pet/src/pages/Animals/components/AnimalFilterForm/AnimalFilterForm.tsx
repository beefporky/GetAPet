import Select from '../../../../components/ui/Select/Select'
import { useAnimals } from '../../../../store/animals-context'
import classes from './AnimalFilterForm.module.css'
import { Form, useNavigation, useSubmit } from 'react-router-dom';
import { DEFAULT_ANIMAL_AGE, DEFAULT_ANIMAL_GENDER, DEFAULT_ANIMAL_SIZE } from '../../../../utils/constants';
import Dropdown from '../../../../components/ui/Dropdown/Dropdown';
import { useRef, useState } from 'react';

const AnimalFilterForm = () => {
    const { animalTypes, breeds } = useAnimals();
    const submit = useSubmit();
    const formRef = useRef<HTMLFormElement>(null);
    const [typeValue, setTypeValue] = useState('Type');

    function onFilterChange(event: React.ChangeEvent<HTMLFormElement>) {
        const target = event.nativeEvent.target as HTMLElement;

        if (!target.className.includes('search')) {
            const formData = new FormData(event.currentTarget);
            const data = Object.fromEntries(formData);
            const dataWithPage = { ...data, page: 1 };
            submit(dataWithPage);
        }
    }

    function handleSubmit() {
        const formData = new FormData(formRef.current!);
        const data = Object.fromEntries(formData);
        const dataWithPage = { ...data, page: 1 };
        submit(dataWithPage);
    }

    const breedOptions = breeds.map((breed) => ({ label: breed.name, value: breed.name }));
    const typeOptions = animalTypes.map((type) => ({ label: type.name, value: type.name }));

    function handleTypeChange(option: string) {
        setTypeValue(option);
        handleSubmit();
    }
    return (
        <aside className={classes.aside}>
            <fieldset className={classes.filters}>
                <legend>Filters</legend>
                <Form method='get' action='/animals' name='filterForm' onChange={onFilterChange} ref={formRef} onSubmit={handleSubmit}>
                    <Dropdown options={typeOptions} name="type" selectLabel="Type" onChange={handleTypeChange} />
                    <Dropdown options={breedOptions} name="breed" selectLabel="Breed" key={typeValue + breedOptions[0].value} />
                    <Select name="age" id="age" selectLabel="Age">
                        {DEFAULT_ANIMAL_AGE.map((age) => <option key={age} value={age}>{age}</option>)}
                    </Select>
                    <Select name="size" id="size" selectLabel="Size">
                        {DEFAULT_ANIMAL_SIZE.map((size) => <option key={size} value={size}>{size}</option>)}
                    </Select>
                    <Select name="gender" id="gender" selectLabel="Gender">
                        {DEFAULT_ANIMAL_GENDER.map((gender) => <option key={gender} value={gender}>{gender}</option>)}
                    </Select>
                </Form>
            </fieldset>
        </aside>
    )
}

export default AnimalFilterForm