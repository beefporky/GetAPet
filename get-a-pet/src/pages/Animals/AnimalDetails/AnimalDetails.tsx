import { defer, redirect, useParams } from 'react-router-dom';
import Loading from '../../../components/ui/Loading/Loading';
import AnimalContent from './AnimalContent';
import { isTokenValid } from '../../../utils/auth';
import { queryClient } from '../../../utils/utils';
import { animalDetailsQuery, useAnimalDetailQuery } from '../../../store/animals-query';

const AnimalDetailsPage = () => {
    const params = useParams<{ animalId: string }>(); // Specify the type of `animalId` as `string`
    const { data: animalsData, isLoading, error } = useAnimalDetailQuery(Number(params.animalId)); // Convert `params.animalId` to `number`

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        throw (error);
    }
    return <AnimalContent animal={animalsData.animal} />
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
    const query = animalDetailsQuery(params.animalId);
    if (!isTokenValid(pathname)) {
        return redirect('/login');
    }
    return defer({
        animal: queryClient.getQueryData(query.queryKey) ?? queryClient.fetchQuery(query)
    });
}