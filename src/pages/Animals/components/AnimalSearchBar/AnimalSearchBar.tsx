import { useSearchParams, useSubmit } from 'react-router-dom'
import SearchBar from '../../../../components/ui/SearchBar/SearchBar'
import { SubmitTarget } from 'react-router-dom/dist/dom';

const AnimalSearchBar = () => {
    const [searchParams] = useSearchParams();
    const existingParams = Object.fromEntries(searchParams.entries());
    const submit = useSubmit();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.currentTarget));
        submit({ ...existingParams, ...data } as SubmitTarget);
    }

    return (
        <SearchBar handleSubmit={handleSubmit} name='name' id='name' placeholder='Search Name' />
    )
}

export default AnimalSearchBar