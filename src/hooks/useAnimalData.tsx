import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useAnimals } from "../store/animals-context";
import { Animal, AnimalBreeds, AnimalType } from "../models/Animal";
import { Pagination } from "../utils/utils";

type LoaderTypes = { animals: Promise<{ animals: Animal[], pagination: Pagination }>, animalTypes: Promise<{ types: AnimalType[] }>, animalBreeds: Promise<{ breeds: AnimalBreeds[] }> }

const useAnimalData = () => {
    const { animals, animalTypes: animalTypesPromise, animalBreeds } = useLoaderData() as LoaderTypes;
    const { replaceAnimals, replacePagination, appendAnimals, replaceAnimalTypes, animalTypes, updateBreeds, pagination } = useAnimals();
    useEffect(() => {
        if (animals.then) {
            animals.then((responseAnimals: { animals: Animal[], pagination: Pagination }) => {
                if (responseAnimals.pagination.current_page > pagination.current_page) {
                    appendAnimals(responseAnimals.animals);
                } else {
                    replaceAnimals(responseAnimals.animals);
                }
                replacePagination(responseAnimals.pagination);
            });
        }
    }, [animals]);


    useEffect(() => {
        if (animalTypesPromise.then) {
            if (animalTypes.length === 0) {
                animalTypesPromise.then((responseAnimalTypes: { types: AnimalType[] }) => {
                    replaceAnimalTypes(responseAnimalTypes.types);
                });
            }
        }
    }, [animalTypes]);

    useEffect(() => {
        if (animalBreeds.then) {
            animalBreeds.then((responseBreeds: { breeds: AnimalBreeds[] }) => {
                updateBreeds(responseBreeds.breeds);
            });
        }
    }, [animalBreeds]);
}

export default useAnimalData