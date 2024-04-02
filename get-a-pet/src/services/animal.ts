import { sendRequest } from "../utils/network";
import { convertObjectToStringQuery } from "../utils/utils";

let isAnimalTypesLoaded = false;

const defaultFilters = {
    type: 'dog',
    page: '1',
    limit: '20'
}

export const getAnimals = async(filters: object) => {
    const filterString = Object.keys(filters).length > 0 ? convertObjectToStringQuery(filters).concat(`&limit=20`) : convertObjectToStringQuery(defaultFilters);
    const data = await sendRequest(`/animals?${filterString}`);

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

export const getAnimalBreeds = async(type: string) => {
    const data = await sendRequest(`/types/${type}/breeds`);

    return data;
}