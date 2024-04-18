import { defer, useLoaderData, Await, redirect, useSubmit, useSearchParams } from 'react-router-dom'
import { getOrganizations } from '../../services/organization'
import Loading from '../../components/ui/Loading/Loading';
import { Suspense, useEffect, useState } from 'react';
import OrganizationsList from './components/OrganizationsList/OrganizationsList';
import { isTokenValid } from '../../utils/auth';
import { Request } from '../../utils/network';
import classes from './Organizations.module.css';
import Button from '../../components/ui/Button/Button';
import Dropdown, { DropdownOption } from '../../components/ui/Dropdown/Dropdown';
import { MdOutlineSort } from 'react-icons/md';
import OrganizationSearchBar from './components/OrganizationSearchBar/OrganizationSearchBar';
import { Pagination } from '../../store/animals-context';

const sortOptions: DropdownOption[] = [{ label: 'Name Ascending', value: 'name' }, { label: 'Name Descending', value: '-name' }];

const OrganizationsPage = () => {
    const { organizations } = useLoaderData() as { organizations: Pagination[] };
    const [sortValue, setSortValue] = useState('');
    const submit = useSubmit();
    const [searchParams] = useSearchParams();


    useEffect(() => {
        submit({ sort: sortValue });
    }, [sortValue]);

    function onSortChange(option: string) {
        setSortValue(option);
    }

    return (
        <Suspense fallback={<Loading />}>
            <Await resolve={organizations}>
                {({ pagination }) => {
                    const nextPage = pagination.current_page + 1;
                    const loadMoreUrl = `/organizations?${searchParams.toString()}&sort=${sortValue}&page=${nextPage}`
                    return <main className={classes.organizationsContainer}>
                        <h3 className={classes.sectionHeader}>Organizations</h3>
                        <OrganizationSearchBar />
                        <div className={classes.sortContainer}>
                            <Dropdown options={sortOptions} selectLabel='Sort By' name='sort' value={sortValue} closeOnSelect icon={<MdOutlineSort />} onChange={onSortChange} />
                        </div>
                        <OrganizationsList />
                        {pagination.current_page < pagination.total_pages ? <Button textOnly={false} className={classes.loadMore} to={loadMoreUrl}>Load More</Button> : ''}
                    </main>
                }}
            </Await>
        </Suspense>
    )
}

export default OrganizationsPage

export function loader({ request }: Request) {
    const newUrl = new URL(request.url);
    const filters = Object.fromEntries(newUrl.searchParams.entries());
    const pathname = newUrl.pathname + newUrl.search;
    if (!isTokenValid(pathname)) {
        return redirect('/login');
    }
    return defer({
        organizations: getOrganizations(filters)
    });
}