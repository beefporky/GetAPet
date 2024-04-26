import { defer, redirect, useSubmit, useSearchParams } from 'react-router-dom'
import { useState } from 'react';
import OrganizationsList from './components/OrganizationsList/OrganizationsList';
import { isTokenValid } from '../../utils/auth';
import { Request } from '../../utils/network';
import classes from './Organizations.module.css';
import Button from '../../components/ui/Button/Button';
import Dropdown, { DropdownOption } from '../../components/ui/Dropdown/Dropdown';
import { MdOutlineSort } from 'react-icons/md';
import OrganizationSearchBar from './components/OrganizationSearchBar/OrganizationSearchBar';
import { organizationsQuery, useOrganizationsQuery } from '../../store/organizations-query';
import { queryClient } from '../../utils/utils';
import Loading from '../../components/ui/Loading/Loading';
import useCustomEffect from '../../hooks/useCustomEffect';

const sortOptions: DropdownOption[] = [{ label: 'Name Ascending', value: 'name' }, { label: 'Name Descending', value: '-name' }];

const OrganizationsPage = () => {
    const [searchParams] = useSearchParams();
    const filters = Object.fromEntries(searchParams.entries());
    const { data, fetchNextPage, isLoading } = useOrganizationsQuery(filters);
    const [sortValue, setSortValue] = useState('');
    const submit = useSubmit();

    useCustomEffect(() => {
        submit({ sort: sortValue });
    }, [sortValue]);

    function onSortChange(option: string) {
        setSortValue(option);
    }
    if (isLoading) {
        return <Loading />
    }
    return <main className={classes.organizationsContainer}>
        <h3 className={classes.sectionHeader}>Organizations</h3>
        <OrganizationSearchBar />
        <div className={classes.sortContainer}>
            <Dropdown options={sortOptions} selectLabel='Sort By' name='sort' value={sortValue} closeOnSelect icon={<MdOutlineSort />} onChange={onSortChange} />
        </div>
        <OrganizationsList />
        {data && data.pages.slice(-1)[0].pagination.current_page < data.pages.slice(-1)[0].pagination.total_pages ? <Button textOnly={false} className={classes.loadMore} onClick={() => fetchNextPage()}>Load More</Button> : null}
    </main>
}

export default OrganizationsPage

export function loader({ request }: Request) {
    const newUrl = new URL(request.url);
    const filters = Object.fromEntries(newUrl.searchParams.entries());
    const pathname = newUrl.pathname + newUrl.search;
    if (!isTokenValid(pathname)) {
        return redirect('/login');
    }
    const organizationsQueryObj = organizationsQuery(filters);
    return defer({
        organizations: queryClient.getQueryData(organizationsQueryObj.queryKey) ?? queryClient.fetchInfiniteQuery(organizationsQueryObj)
    });
}