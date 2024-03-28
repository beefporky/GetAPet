import { Suspense, useEffect } from "react";
import { getAnimals } from "../../services/animal";
import { Await, defer, redirect, useLoaderData } from "react-router-dom";
import Loading from "../../components/ui/Loading/Loading";
import { useAnimals } from "../../store/animals-context";
import AnimalsList from "./components/AnimalsList/AnimalsList";
import { Animal } from "../../models/Animal";
import { Pagination } from "../../store/animals-context";
import AnimalSearchBar from "./components/AnimalSearchBar/AnimalSearchBar";
import classes from './Animals.module.css'
import { hasToken } from "../../utils/auth";

const AnimalsPage = () => {
    const { animals } = useLoaderData();
    const { replaceAnimals, replacePagination, appendAnimals } = useAnimals();
    useEffect(() => {
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

export function loader({ request }: Request) {
    const newUrl = new URL(request.url);
    const page = newUrl.searchParams.get('page') || '1';
    const pathname = newUrl.pathname;
    if (!hasToken()) {
        localStorage.setItem('prevPath', pathname);
        return redirect('/login');
    }
    return defer({
        animals: getAnimals(page)
    })
}