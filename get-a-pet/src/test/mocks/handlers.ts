import { http, HttpResponse, delay } from 'msw';
import { defaultURL } from '../../utils/constants';
import { animalsResponse } from './animals/animals';
import { animalTypesResponse } from './animals/animalTypes';
import { animalBreedsResponse } from './animals/animalBreeds';


const mockToken = {
    access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJHcG84UzlQSHQ4WG9IUnZOV1FRTmxBbVBXNHRXSjBzdmx5dWZxS3l6MjVKb1VYblBYeSIsImp0aSI6ImVmZjhjNTBkMTBjOWU0OTlhOWNmZjIzMzlkMGRhNjUxOTY3NzQyYTFjNTRhYjA1ZmUyYjBhZDNjNzc0OGRmODVhZDYwNjU5ZDdiZWI1NGFhIiwiaWF0IjoxNzEzNzYxNzIxLCJuYmYiOjE3MTM3NjE3MjEsImV4cCI6MTcxMzc2NTMyMSwic3ViIjoiIiwic2NvcGVzIjpbXX0.uS1pb09gZHTI6HyFR4DQWs-IHyL-LKT7lNe1Dtm3S7UHNW00QB9Pgbglr7U882P-m1OcYWoerdhqj9p62Sbuuxse0n9KyH1fPF89QBFB2qsC-sfqF2VfnsS1lv7_Sg73w33uuR72HfFE0TLXdqy4fCqrrPP0-8FUESNusNb0km1cCukVIcndUZcA3tA9x9fvSTAdmehjLszHNYM3WRV6zc41sWHQGxyZExxepbCe7hzSmXAbwDsOlQQhPqY4o4Abi4E1YwofKRDExv1DQbb-dV9IEEQbEBhBebVPI_FOW_Q55wBxfnkvs9U_WWlkYqUrhg56PlmDNHNopydqGH_YuA",
    expires_in: 3600,
    token_type: "Bearer"
};

export const handlers = [
    http.post(`${defaultURL}/oauth2/token`, async () => {
        await delay(150);
        return HttpResponse.json(mockToken)
    }),

    http.get(`${defaultURL}/animals`, async () => {
        await delay(1);
        return HttpResponse.json(animalsResponse)
    }),

    http.get(`${defaultURL}/types`, async () => {
        await delay(1);
        return HttpResponse.json(animalTypesResponse)
    }),

    http.get(`${defaultURL}/types/dog/breeds`, async () => {
        await delay(1);
        return HttpResponse.json(animalBreedsResponse)
    })
];