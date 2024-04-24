import { http, HttpResponse, delay } from 'msw';
import { defaultURL } from '../../utils/constants';
import { animalsResponse } from './animals/animals';
import {animalDetailResponse} from './animals/animalDetails'
import { animalTypesResponse } from './animals/animalTypes';
import { animalBreedsResponse } from './animals/animalBreeds';
import { mockToken } from './auth';

export const handlers = [
    http.post(`${defaultURL}/oauth2/token`, async () => {
        await delay(150);
        return HttpResponse.json(mockToken)
    }),

    http.get(`${defaultURL}/animals`, async () => {
        await delay(150);
        return HttpResponse.json(animalsResponse)
    }),

    http.get(`${defaultURL}/types`, async () => {
        await delay(150);
        return HttpResponse.json(animalTypesResponse)
    }),

    http.get(`${defaultURL}/types/dog/breeds`, async () => {
        await delay(150);
        return HttpResponse.json(animalBreedsResponse)
    }),

    http.get(`${defaultURL}/animals/71418924`, async () => {
        await delay(150);
        return HttpResponse.json(animalDetailResponse)
    }),

];