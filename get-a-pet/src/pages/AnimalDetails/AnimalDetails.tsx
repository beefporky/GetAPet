import { Await, defer, redirect, useRouteLoaderData } from 'react-router-dom';
import { Suspense } from 'react';
import Loading from '../../components/ui/Loading/Loading';
import AnimalContent from './AnimalContent';
import { isTokenValid } from '../../utils/auth';
import { queryClient } from '../../utils/utils';
import { getAnimalQuery } from '../../store/animals-query';

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
    const query = getAnimalQuery(params.animalId);
    if (!isTokenValid(pathname)) {
        return redirect('/login');
    }
    return defer({
        animal: queryClient.getQueryData(query.queryKey) ?? queryClient.fetchQuery(query)
    });
}