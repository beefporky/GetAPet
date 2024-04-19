import { useEffect, useState } from "react";
import { defer, redirect, useLoaderData, useSearchParams } from "react-router-dom";
import Loading from "../../components/ui/Loading/Loading";
import AnimalsList from "./components/AnimalsList/AnimalsList";
import AnimalSearchBar from "./components/AnimalSearchBar/AnimalSearchBar";
import classes from './Animals.module.css'
import { isTokenValid } from "../../utils/auth";
import AnimalFilterForm from "./components/AnimalFilterForm/AnimalFilterForm";
import { queryClient } from "../../utils/utils";
import { animalBreedsQuery, animalTypesQuery, useAnimalsQuery } from "../../store/animals-query";
import { useAnimals } from "../../store/animals-context";
import { AnimalBreeds, Animal, AnimalType } from "../../models/Animal";
import { animalsQuery } from "../../store/animals-query";
import { Request } from "../../utils/network";
import { Pagination } from "../../utils/utils";

type LoaderTypes = { animals: Promise<{ animals: Animal[], pagination: Pagination }>, animalTypes: Promise<{ types: AnimalType[] }>, animalBreeds: Promise<{ breeds: AnimalBreeds[] }> }


const AnimalsPage = () => {
    const [searchParams] = useSearchParams();
    const { error, isLoading } = useAnimalsQuery(Object.fromEntries(searchParams.entries()));
    const { animals, animalTypes: animalTypesPromise, animalBreeds } = useLoaderData() as LoaderTypes;
    const { replaceAnimals, replacePagination, appendAnimals, replaceAnimalTypes, animalTypes, updateBreeds, pagination } = useAnimals();
    const [filterFormData, setFilterFormData] = useState<object>({});
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // TODO: refactor useEffect
    useEffect(() => {
        if (animals.then) {
            animals.then((responseAnimals: { animals: Animal[], pagination: Pagination }) => {
                if (responseAnimals.pagination.current_page > pagination.current_page) {
                    appendAnimals(responseAnimals.animals);
                } else {
                    replaceAnimals(responseAnimals.animals);
                }
                replacePagination(responseAnimals.pagination);
            });
        }
    }, [animals]);


    useEffect(() => {
        if (animalTypesPromise.then) {
            if (animalTypes.length === 0) {
                animalTypesPromise.then((responseAnimalTypes: { types: AnimalType[] }) => {
                    replaceAnimalTypes(responseAnimalTypes.types);
                });
            }
        }
    }, [animalTypes]);

    useEffect(() => {
        if (animalBreeds.then) {
            animalBreeds.then((responseBreeds: { breeds: AnimalBreeds[] }) => {
                updateBreeds(responseBreeds.breeds);
            });
        }
    }, [animalBreeds]);

    function filterFormDataChange(formData: object) {
        setFilterFormData(formData);
    }

    function toggleFilterForm() {
        setIsMobileFilterOpen(prev => !prev);
    }

    if (isLoading) return <Loading />;

    if (error) {
        throw error
    }

    return <main className={classes.animals}>
        <h3 className={classes.sectionHeader}>Animals</h3>
        <AnimalSearchBar />
        <div className={classes.filtersAndList}>
            <AnimalFilterForm filterFormDataChange={filterFormDataChange} isMobileFilterOpen={isMobileFilterOpen} toggleFilterForm={toggleFilterForm} />
            <AnimalsList filterFormData={filterFormData} toggleFilterForm={toggleFilterForm} />
        </div>
    </main>;
}

export default AnimalsPage

export async function loader({ request }: Request) {
    const newUrl = new URL(request.url);
    const filters = Object.fromEntries(newUrl.searchParams.entries());
    const pathname = newUrl.pathname + newUrl.search;
    if (!isTokenValid(pathname)) {
        return redirect('/login');
    }
    const animalsQueryObj = animalsQuery(filters);
    const animalTypesQueryObj = animalTypesQuery();
    const animalBreedsQueryObj = animalBreedsQuery(filters.type || 'dog');
    return defer({
        animals: queryClient.getQueryData(animalsQueryObj.queryKey) ?? queryClient.fetchQuery(animalsQueryObj),
        animalTypes: queryClient.getQueryData(animalTypesQueryObj.queryKey) ?? queryClient.fetchQuery(animalTypesQueryObj),
        animalBreeds: queryClient.getQueryData(animalBreedsQueryObj.queryKey) ?? queryClient.fetchQuery(animalBreedsQueryObj)
    });
}
