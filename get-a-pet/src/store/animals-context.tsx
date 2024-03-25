import { ReactNode, createContext, useContext, useState } from "react";
import { type Animal } from "../models/Animal";

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
}
// { animals: Animal[]; pagination: Pagination; replaceAnimals: (animals: Animal[]) => void; replacePagination: (pagination: Pagination) => void; }

const AnimalsContext = createContext<AnimalValues>({
    animals: [],
    pagination: {
        count_per_page: 0,
        total_count: 0,
        current_page: 0,
        total_pages: 0,
        _links: {}
    },
    replaceAnimals: () => { },
    appendAnimals: () => { },
    replacePagination: () => { }
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

    const ctx = {
        animals: animals,
        pagination: pagination,
        replaceAnimals,
        appendAnimals,
        replacePagination
    }

    return <AnimalsContext.Provider value={ctx}>
        {children}
    </AnimalsContext.Provider>
}

export default AnimalsContextProvider