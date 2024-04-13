import { Await, defer, redirect, useRouteLoaderData } from 'react-router-dom';
import { getAnimal } from '../../services/animal';
import { Suspense } from 'react';
import Loading from '../../components/ui/Loading/Loading';
import AnimalContent from './AnimalContent';
import { isTokenValid } from '../../utils/auth';

const AnimalDetailsPage = () => {
    const { animal } = useRouteLoaderData('animal');
    return (
        <Suspense fallback={<Loading />}>
            <Await resolve={animal}>
                {(animalsData) => {
                    return <AnimalContent animal={animalsData.animal} />
                }}
            </Await>
        </Suspense>
    )
}

export default AnimalDetailsPage

type ParamsType = {
    params: {
        animalId: number;

    }
    request: {
        url: string;
    }
}

export async function loader({ request, params }: ParamsType) {
    const newUrl = new URL(request.url);
    const pathname = newUrl.pathname + newUrl.search;
    debugger
    if (!isTokenValid(pathname)) {
        return redirect('/login');
    }
    return defer({
        animal: getAnimal(params.animalId)
    });
}