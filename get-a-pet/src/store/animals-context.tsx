import { ReactNode, createContext, useContext, useState } from "react";
import { AnimalType, type Animal } from "../models/Animal";

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
    replaceAnimalTypes() { }
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

    function replaceAnimals(animals: Animal[]) {
        setAnimals(animals);
    }

    function appendAnimals(animals: Animal[]) {
        setAnimals(prevAnimals => [...prevAnimals, ...animals]);
    }

    function replacePagination(pagination: Pagination) {
        setPagination(pagination);
    }

    function replaceAnimalTypes(animalTypes: AnimalType[]) {
        setAnimalTypes(animalTypes);
    }

    const ctx = {
        animals,
        pagination,
        replaceAnimals,
        appendAnimals,
        replacePagination,
        animalTypes,
        replaceAnimalTypes
    }

    return <AnimalsContext.Provider value={ctx}>
        {children}
    </AnimalsContext.Provider>
}

export default AnimalsContextProvider