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

export const getAnimalQuery = (id: number) => {
    return {
        queryKey: ['animal', id],
        queryFn: () => getAnimal(id)
    }
}