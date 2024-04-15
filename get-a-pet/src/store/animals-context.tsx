import { ReactNode, createContext, useContext, useState } from "react";
import { AnimalType, type Animal, type AnimalBreeds } from "../models/Animal";

export type Pagination = {
    count_per_page: number;
    total_count: number;
    current_page: number;
    total_pages: number;
    _links: object;
}

type AnimalValues = {
    animals: Animal[];
    pagination: Pagination;
    replaceAnimals: (animals: Animal[]) => void;
    appendAnimals: (animals: Animal[]) => void;
    replacePagination: (pagination: Pagination) => void;
    animalTypes: AnimalType[]
    replaceAnimalTypes: (animalTypes: AnimalType[]) => void;
    animalTypeFilter: string;
    updateAnimalTypeFilter: (animalType: string) => void;
    breeds: AnimalBreeds[];
    updateBreeds: (breeds: AnimalBreeds[]) => void;
}

const AnimalsContext = createContext<AnimalValues>({
    animals: [],
    pagination: {
        count_per_page: 0,
        total_count: 0,
        current_page: 0,
        total_pages: 0,
        _links: {}
    },
    replaceAnimals() { },
    appendAnimals() { },
    replacePagination() { },
    animalTypes: [],
    replaceAnimalTypes() { },
    animalTypeFilter: '',
    updateAnimalTypeFilter() { },
    breeds: [],
    updateBreeds() { }
});

export const useAnimals = () => {
    const props = useContext(AnimalsContext);

    return props;
}

type AnimalsProps = {
    children: ReactNode
}

const AnimalsContextProvider = ({ children }: AnimalsProps) => {
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [animalTypes, setAnimalTypes] = useState<AnimalType[]>([]);
    const [pagination, setPagination] = useState<Pagination>({} as Pagination);
    const [animalTypeFilter, setAnimalTypeFilter] = useState<string>('' as string);
    const [breeds, setBreeds] = useState<AnimalBreeds[]>([]);

    function replaceAnimals(animals: Animal[]) {
        setAnimals(animals);
    }

    function appendAnimals(animals: Animal[]) {
        setAnimals(prevAnimals => {
            const animalIds = prevAnimals.map((animal: Animal) => animal.id);
            const uniqueAnimals = animals.filter((animal: Animal) => !animalIds.includes(animal.id));
            return [...prevAnimals, ...uniqueAnimals]
        });
    }

    function replacePagination(pagination: Pagination) {
        setPagination(pagination);
    }

    function replaceAnimalTypes(animalTypes: AnimalType[]) {
        setAnimalTypes(animalTypes);
    }

    function updateAnimalTypeFilter(animalType: string) {
        setAnimalTypeFilter(animalType);
    }

    function updateBreeds(breeds: AnimalBreeds[]) {
        setBreeds(breeds);
    }

    const ctx = {
        animals,
        pagination,
        replaceAnimals,
        appendAnimals,
        replacePagination,
        animalTypes,
        replaceAnimalTypes,
        animalTypeFilter,
        updateAnimalTypeFilter,
        breeds,
        updateBreeds
    }

    return <AnimalsContext.Provider value={ctx}>
        {children}
    </AnimalsContext.Provider>
}

export default AnimalsContextProvider