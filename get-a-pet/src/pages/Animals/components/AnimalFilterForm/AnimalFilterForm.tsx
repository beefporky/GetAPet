import { useAnimals } from '../../../../store/animals-context'
import classes from './AnimalFilterForm.module.css'
import { Form, useSubmit } from 'react-router-dom';
import { DEFAULT_ANIMAL_AGE, DEFAULT_ANIMAL_GENDER, DEFAULT_ANIMAL_SIZE } from '../../../../utils/constants';
import Dropdown from '../../../../components/ui/Dropdown/Dropdown';
import { useEffect, useRef, useState } from 'react';
import Button from '../../../../components/ui/Button';

const AnimalFilterForm = () => {
    const { animalTypes, breeds } = useAnimals();
    const submit = useSubmit();
    const formRef = useRef<HTMLFormElement>(null);
    const [typeValue, setTypeValue] = useState('');
    const [breedValue, setBreedValue] = useState('');
    const [ageValue, setAgeValue] = useState('');
    const [sizeValue, setSizeValue] = useState('');
    const [genderValue, setGenderValue] = useState('');

    function onFilterChange(event: React.ChangeEvent<HTMLFormElement>) {
        const target = event.nativeEvent.target as HTMLElement;
        if (!target.className.includes('search')) {
            const formData = new FormData(event.currentTarget);
            const data = Object.fromEntries(formData);
            const dataWithPage = { ...data, page: 1 };
            submit(dataWithPage);
        }
    }

    useEffect(() => {
        handleSubmit();
    }, [typeValue, breedValue, ageValue, sizeValue, genderValue]);

    function handleSubmit() {
        const formData = new FormData(formRef.current!);
        const data = Object.fromEntries(formData);
        const dataWithPage = { ...data, page: 1 };
        submit(dataWithPage);
    }

    const typeOptions = animalTypes.map((type) => ({ label: type.name, value: type.name }));
    const breedOptions = breeds.map((breed) => ({ label: breed.name, value: breed.name }));
    const ageOptions = DEFAULT_ANIMAL_AGE.map((age) => ({ label: age, value: age }));
    const sizeOptions = DEFAULT_ANIMAL_SIZE.map((size) => ({ label: size, value: size }));
    const genderOptions = DEFAULT_ANIMAL_GENDER.map((gender) => ({ label: gender, value: gender }));

    function handleTypeChange(value: string) {
        setTypeValue(value);
        setBreedValue('');
    }
    function handleBreedChange(value: string) {
        setBreedValue(value);
    }
    function handleAgeChange(value: string) {
        setAgeValue(value);
    }
    function handleSizeChange(value: string) {
        setSizeValue(value);
    }
    function handleGenderChange(value: string) {
        setGenderValue(value);
    }

    return (
        <aside className={classes.aside}>
            <fieldset className={classes.filters}>
                <legend>Filters</legend>
                <Form method='get' action='/animals' name='filterForm' onChange={onFilterChange} ref={formRef} onSubmit={handleSubmit}>
                    <Dropdown options={typeOptions} name="type" selectLabel="Type" onChange={handleTypeChange} value={typeValue} multi />
                    <Dropdown options={breedOptions} name="breed" selectLabel="Breed" key={typeValue + breedOptions[0].value} hasSearch={false} onChange={handleBreedChange} value={breedValue} />
                    <Dropdown options={ageOptions} name="age" selectLabel="Age" hasSearch={false} onChange={handleAgeChange} value={ageValue} />
                    <Dropdown options={sizeOptions} name="size" selectLabel="Size" hasSearch={false} onChange={handleSizeChange} value={sizeValue} />
                    <Dropdown options={genderOptions} name="gender" selectLabel="Gender" hasSearch={false} onChange={handleGenderChange} value={genderValue} />
                    <Button textOnly={false} type='reset'>Reset</Button>
                </Form>
            </fieldset>
        </aside>
    )
}

export default AnimalFilterForm