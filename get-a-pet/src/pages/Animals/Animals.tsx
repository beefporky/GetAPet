import { Suspense, useEffect, useState } from "react";
import { getAnimalBreeds, getAnimalTypes, getAnimals } from "../../services/animal";
import { Await, defer, redirect, useLoaderData } from "react-router-dom";
import Loading from "../../components/ui/Loading/Loading";
import { useAnimals } from "../../store/animals-context";
import AnimalsList from "./components/AnimalsList/AnimalsList";
import { Animal, AnimalBreeds, AnimalType } from "../../models/Animal";
import { Pagination } from "../../store/animals-context";
import AnimalSearchBar from "./components/AnimalSearchBar/AnimalSearchBar";
import classes from './Animals.module.css'
import { isTokenValid } from "../../utils/auth";
import AnimalFilterForm from "./components/AnimalFilterForm/AnimalFilterForm";

type LoaderTypes = { animals: Promise<{ animals: Animal[], pagination: Pagination }>, animalTypes: Promise<{ types: AnimalType[] }>, animalBreeds: Promise<{ breeds: AnimalBreeds[] }> }

const AnimalsPage = () => {
    const { animals, animalTypes: animalTypesPromise, animalBreeds } = useLoaderData() as LoaderTypes;
    const { replaceAnimals, replacePagination, appendAnimals, replaceAnimalTypes, animalTypes, updateBreeds, pagination } = useAnimals();
    const [filterFormData, setFilterFormData] = useState<object>({});
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    useEffect(() => {
        animals.then((responseAnimals: { animals: Animal[], pagination: Pagination }) => {
            if (responseAnimals.pagination.current_page > pagination.current_page) {
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

    useEffect(() => {
        animalBreeds.then((responseBreeds: { breeds: AnimalBreeds[] }) => {
            updateBreeds(responseBreeds.breeds);
        });
    }, [animalBreeds]);

    function filterFormDataChange(formData: object) {
        setFilterFormData(formData);
    }

    function toggleFilterForm() {
        setIsMobileFilterOpen(prev => !prev);
    }

    return (
        <Suspense fallback={<Loading />}>
            <Await resolve={animals}>
                <main className={classes.animals}>
                    <AnimalSearchBar />
                    <div className={classes.filtersAndList}>
                        <AnimalFilterForm filterFormDataChange={filterFormDataChange} isMobileFilterOpen={isMobileFilterOpen} toggleFilterForm={toggleFilterForm} />
                        <AnimalsList filterFormData={filterFormData} toggleFilterForm={toggleFilterForm} />
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

// TODO: make sure router url works when pasted in another incognito browser
export async function loader({ request }: Request) {
    const newUrl = new URL(request.url);
    const filters = Object.fromEntries(newUrl.searchParams.entries());
    const pathname = newUrl.pathname;
    if (isTokenValid(pathname)) {
        return redirect('/login');
    }
    return defer({
        animals: getAnimals(filters),
        animalTypes: getAnimalTypes(),
        animalBreeds: getAnimalBreeds(filters.type || 'dog')
    });
}

