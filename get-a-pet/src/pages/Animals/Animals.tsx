import { Suspense, useEffect } from "react";
import { getAnimalTypes, getAnimals } from "../../services/animal";
import { Await, defer, redirect, useLoaderData } from "react-router-dom";
import Loading from "../../components/ui/Loading/Loading";
import { useAnimals } from "../../store/animals-context";
import AnimalsList from "./components/AnimalsList/AnimalsList";
import { Animal, AnimalType } from "../../models/Animal";
import { Pagination } from "../../store/animals-context";
import AnimalSearchBar from "./components/AnimalSearchBar/AnimalSearchBar";
import classes from './Animals.module.css'
import { isTokenValid } from "../../utils/auth";
import AnimalFilterForm from "./components/AnimalFilterForm/AnimalFilterForm";

const AnimalsPage = () => {
    const { animals, animalTypes: animalTypesPromise } = useLoaderData();
    const { replaceAnimals, replacePagination, appendAnimals, replaceAnimalTypes, animalTypes } = useAnimals();

    useEffect(() => {
        animals.then((responseAnimals: { animals: Animal[], pagination: Pagination }) => {
            if (responseAnimals.pagination.current_page > 1) {
                appendAnimals(responseAnimals.animals);
            } else {
                replaceAnimals(responseAnimals.animals);
            }
            replacePagination(responseAnimals.pagination);
        });
    }, [animals]);

    useEffect(() => {
        if (animalTypes.length === 0) {
            animalTypesPromise.then((responseAnimalTypes: { types: AnimalType[] }) => {
                replaceAnimalTypes(responseAnimalTypes.types);
            });
        }
    }, [animalTypes]);

    return (
        <Suspense fallback={<Loading />}>
            <Await resolve={animals}>
                <main className={classes.animals}>
                    <AnimalSearchBar />
                    <div className={classes.filtersAndList}>
                        <AnimalFilterForm />
                        <AnimalsList />
                    </div>
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
    if (isTokenValid(pathname)) {
        return redirect('/login');
    }
    return defer({
        animals: getAnimals(page),
        animalTypes: getAnimalTypes()
    });
}

