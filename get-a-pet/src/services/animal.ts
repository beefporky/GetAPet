import { sendRequest } from "../utils/network";

let isAnimalTypesLoaded = false;

export const getAnimals = async(page: string) => {
    const data = await sendRequest(`/animals?limit=20&page=${page}`);

    return data;
}

export const getAnimalTypes = async() => {
    if (!isAnimalTypesLoaded) {
        const data = await sendRequest(`/types`);
        isAnimalTypesLoaded = true;
        return data;
    }
    return Promise.resolve({ types: [] });
}