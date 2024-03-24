import { Suspense, useEffect } from "react";
import { getAnimals } from "../../services/http";
import { Await, defer, useLoaderData } from "react-router-dom";
import Loading from "../../components/ui/Loading/Loading";
import { useAnimals } from "../../store/animals-context";
import AnimalsList from "./AnimalsList";
import { Animal } from "../../models/Animal";

const AnimalsPage = () => {
    const { animals } = useLoaderData();
    const { replaceAnimals } = useAnimals();

    useEffect(() => {
        // TODO: add pagination
        animals.then((responseAnimals: { animals: Animal[] }) => {
            replaceAnimals(responseAnimals.animals);
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

export async function loader() {
    return defer({
        animals: getAnimals()
    });
}