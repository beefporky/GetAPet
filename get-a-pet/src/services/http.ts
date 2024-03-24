import { sendRequest } from "../utils/network";

export const getAnimals = async() => {
    const data = await sendRequest("/animals?limit=1&page=1");

    return data;
}