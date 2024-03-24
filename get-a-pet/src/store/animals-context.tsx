import { ReactNode, createContext, useContext, useState } from "react";
import { type Animal } from "../models/Animal";

type AnimalValues = {
    animals: Animal[],
    replaceAnimals: (animals: Animal[]) => void;
}

const AnimalsContext = createContext<AnimalValues>({
    animals: [],
    replaceAnimals: () => { }
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

    function replaceAnimals(animals: Animal[]) {
        setAnimals(animals);
    }

    const ctx = {
        animals,
        replaceAnimals
    }

    return <AnimalsContext.Provider value={ctx}>
        {children}
    </AnimalsContext.Provider>
}

export default AnimalsContextProvider