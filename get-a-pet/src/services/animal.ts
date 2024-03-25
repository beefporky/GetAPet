import { sendRequest } from "../utils/network";

export const getAnimals = async(page: string) => {
    const data = await sendRequest(`/animals?limit=20&page=${page}`);

    return data;
}