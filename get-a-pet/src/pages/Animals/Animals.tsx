import { Suspense, useEffect } from "react";
import { getAnimals } from "../../services/animal";
import { Await, Navigate, defer, redirect, redirectDocument, useLoaderData } from "react-router-dom";
import Loading from "../../components/ui/Loading/Loading";
import { useAnimals } from "../../store/animals-context";
import AnimalsList from "./components/AnimalsList/AnimalsList";
import { Animal } from "../../models/Animal";
import { Pagination } from "../../store/animals-context";
import AnimalSearchBar from "./components/AnimalSearchBar/AnimalSearchBar";
import classes from './Animals.module.css'

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
                <main className={classes.animals}>
                    <AnimalSearchBar />
                    <AnimalsList />
                </main>
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
    const newUrl = new URL(request.url);
    const page = newUrl.searchParams.get('page') || '1';
    return defer({
        animals: getAnimals(page)
    });
}