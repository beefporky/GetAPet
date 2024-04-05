import { sendRequest } from "../utils/network";
import { convertObjectToStringQuery, removeEmptyObjectValues } from "../utils/utils";

let isAnimalTypesLoaded = false;

const defaultFilters = {
    type: 'dog',
    page: '1',
    limit: '20'
}

export const getAnimals = async(filters: object) => {
    const filtersWithValues = removeEmptyObjectValues(filters);
    const filterString = Object.keys(filtersWithValues).length > 0 ? convertObjectToStringQuery(filtersWithValues).concat(`&limit=20`) : convertObjectToStringQuery(defaultFilters);
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