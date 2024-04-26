import { useAnimals } from '../../../../store/animals-context'
import classes from './AnimalFilterForm.module.css'
import { Form, useNavigation, useSearchParams, useSubmit } from 'react-router-dom';
import { DEFAULT_ANIMAL_AGE, DEFAULT_ANIMAL_GENDER, DEFAULT_ANIMAL_SIZE } from '../../../../utils/constants';
import Dropdown from '../../../../components/ui/Dropdown/Dropdown';
import { useEffect, useRef, useState } from 'react';
import Button from '../../../../components/ui/Button/Button';
import useCustomEffect from '../../../../hooks/useCustomEffect';

type AnimalFilterFormProps = {
    filterFormDataChange: (formData: object) => void;
    isMobileFilterOpen: boolean;
    toggleFilterForm: () => void;
}

const AnimalFilterForm = ({ filterFormDataChange, isMobileFilterOpen, toggleFilterForm }: AnimalFilterFormProps) => {
    const [searchParams] = useSearchParams();
    const searchParamsObj = Object.fromEntries(searchParams.entries());
    const { animalTypes, breeds } = useAnimals();
    const submit = useSubmit();
    const formRef = useRef<HTMLFormElement>(null);
    const [typeValue, setTypeValue] = useState(searchParamsObj.type || '');
    const [breedValue, setBreedValue] = useState(searchParamsObj.breed || '');
    const [ageValue, setAgeValue] = useState(searchParamsObj.age || '');
    const [sizeValue, setSizeValue] = useState(searchParamsObj.size || '');
    const [genderValue, setGenderValue] = useState(searchParamsObj.gender || '');
    const { state } = useNavigation();
    const [breedDisabled, setBreedDisabled] = useState(false);

    useCustomEffect(() => {
        handleSubmit();
    }, [typeValue, breedValue, ageValue, sizeValue, genderValue]);

    useEffect(() => {
        if (state === "loading") {
            setBreedDisabled(true);
        } else {
            setBreedDisabled(false);
        }
    }, [typeValue, state]);

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
        if (filterFormDataChange) {
            filterFormDataChange(Object.fromEntries(formData));
        }
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
        <aside className={classes.filterContainer}>
            <fieldset className={isMobileFilterOpen ? [classes.filters, classes.active].join(' ') : classes.filters}>
                <legend className={classes.filterLegend}>Filters</legend>
                <Form method='get' action='/animals' name='filterForm' onChange={onFilterChange} ref={formRef} onSubmit={handleSubmit} className={classes.filterForm}>
                    <Dropdown options={typeOptions} name="type" selectLabel="Type" onChange={handleTypeChange} value={typeValue} hasSearch />
                    {breedOptions.length > 0 && <Dropdown options={breedOptions} name="breed" selectLabel="Breed" key={typeValue + breedOptions[0].value} onChange={handleBreedChange} value={breedValue} multi hasSearch disabled={breedDisabled} />}
                    <Dropdown options={ageOptions} name="age" selectLabel="Age" onChange={handleAgeChange} value={ageValue} multi />
                    <Dropdown options={sizeOptions} name="size" selectLabel="Size" onChange={handleSizeChange} value={sizeValue} multi />
                    <Dropdown options={genderOptions} name="gender" selectLabel="Gender" onChange={handleGenderChange} value={genderValue} multi />
                    <div>
                        <Button textOnly={false} type='button' onClick={toggleFilterForm} className={classes.resultsToggle}>Show Results</Button>
                    </div>
                </Form>
            </fieldset>
        </aside>
    )
}

export default AnimalFilterForm