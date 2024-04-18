import { sendRequest } from "../utils/network";
import { convertObjectToStringQuery, removeEmptyObjectValues } from "../utils/utils";

const defaultFilters = {
    page: '1',
    limit: '20'
}

export const getOrganizations = async(filters: object) => {
    const filtersWithValues = removeEmptyObjectValues(filters);
    const filterString = Object.keys(filtersWithValues).length > 0 ? convertObjectToStringQuery(filtersWithValues).concat(`&limit=20`) : convertObjectToStringQuery(defaultFilters);
    const data = await sendRequest(`/organizations?${filterString}`);
    
    return data;
}