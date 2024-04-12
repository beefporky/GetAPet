import { Await, defer, useRouteLoaderData } from 'react-router-dom';
import { getAnimal } from '../../services/animal';
import classes from './AnimalDetails.module.css';
import { Suspense, useEffect } from 'react';
import Loading from '../../components/ui/Loading/Loading';

const AnimalDetailsPage = () => {
    const { animal } = useRouteLoaderData('animal');
    return (
        <Suspense fallback={<Loading />}>
            <Await resolve={animal}>
                {(animalsData) => JSON.stringify(animalsData)}
            </Await>
        </Suspense>
    )
}

export default AnimalDetailsPage

type ParamsType = {
    params: {
        animalId: number;
    }
}
export async function loader({ params }: ParamsType) {
    return defer({
        animal: getAnimal(params.animalId)
    });
}