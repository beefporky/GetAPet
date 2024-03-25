import { Suspense, useEffect } from "react";
import { getAnimals } from "../../services/animal";
import { Await, defer, useLoaderData } from "react-router-dom";
import Loading from "../../components/ui/Loading/Loading";
import { useAnimals } from "../../store/animals-context";
import AnimalsList from "./AnimalsList";
import { Animal } from "../../models/Animal";
import { Pagination } from "../../store/animals-context";

const AnimalsPage = () => {
    const { animals } = useLoaderData();
    const { replaceAnimals, replacePagination, appendAnimals } = useAnimals();

    useEffect(() => {
        // TODO: add pagination
        animals.then((responseAnimals: { animals: Animal[], pagination: Pagination }) => {
            if (responseAnimals.pagination.current_page > 1) {
                appendAnimals(responseAnimals.animals);
            } else {
                replaceAnimals(responseAnimals.animals);
            }
            replacePagination(responseAnimals.pagination);
        })
    }, [animals])

    return (
        <Suspense fallback={<Loading />}>
            <Await resolve={animals}>
                <AnimalsList />
            </Await>
        </Suspense>
    )
}

export default AnimalsPage
type Request = {
    request: {
        url: string;
    }
}
export async function loader({ request }: Request) {
    // TODO: add more request filters
    const newUrl = new URL(request.url);
    const page = newUrl.searchParams.get('page') || '1';
    return defer({
        animals: getAnimals(page)
    });
}