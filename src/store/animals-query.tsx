import { useQuery } from "@tanstack/react-query"
import { getAnimals, getAnimalTypes, getAnimalBreeds, getAnimal } from "../services/animal"

export const animalsQuery = (filters: object) => {
    return {
        queryKey: ['animals', filters],
        queryFn: () => getAnimals(filters)
    }
}

export const animalTypesQuery = () => {
    return {
        queryKey: ['animalTypes'],
        queryFn: () => getAnimalTypes()
    }
}

export const animalBreedsQuery = (filters: string) => {
    return {
        queryKey: ['animalBreeds', filters],
        queryFn: () => getAnimalBreeds(filters)
    }
}

export const animalDetailsQuery = (id: number) => {
    return {
        queryKey: ['animals', 'detail', id],
        queryFn: () => getAnimal(id)
    }
}

export const useAnimalsQuery = (filters: object) => {
    return useQuery(animalsQuery(filters));
}

export const useAnimalDetailQuery = (id: number) => {
    return useQuery(animalDetailsQuery(id));
}