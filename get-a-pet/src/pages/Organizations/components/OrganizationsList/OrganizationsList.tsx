import { useNavigation, useSearchParams } from 'react-router-dom'
import { Organization } from '../../../../models/Organization';
import classes from './OrganizationsList.module.css'
import OrganizationItem from '../OrganizationItem/OrganizationItem';
import { useOrganizationsQuery } from '../../../../store/organizations-query';
import Loading from '../../../../components/ui/Loading/Loading';

const OrganizationsList = () => {
    const [searchParams] = useSearchParams();
    const filters = Object.fromEntries(searchParams.entries());
    const { data, error, isFetchingNextPage } = useOrganizationsQuery(filters);
    const { state } = useNavigation();

    let content = <Loading />

    if (error) {
        throw error;
    }
    if (data) {
        const organizations = [];
        for (const page of data.pages) {
            organizations.push(...page.organizations);
        }
        content = (
            <>
                {organizations.map((organization: Organization) => (
                    <li key={organization.id}>
                        <OrganizationItem organization={organization} />
                    </li>
                ))}
            </>
        );
    }

    return <ul className={state === 'loading' || isFetchingNextPage ? `${classes.organizationsList} ${classes.disabled}` : classes.organizationsList}>
        {content}
    </ul>
}

export default OrganizationsList