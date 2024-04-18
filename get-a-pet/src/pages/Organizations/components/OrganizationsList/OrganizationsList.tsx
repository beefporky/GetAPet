import { useAsyncValue, useNavigation } from 'react-router-dom'
import { Organization } from '../../../../models/Organization';
import classes from './OrganizationsList.module.css'
import OrganizationItem from '../OrganizationItem/OrganizationItem';

type OrganizationResponseType = {
    organizations: Organization[];
    pagination: {
        total: number;
        limit: number;
        page: number;
        pages: number;
    }
}

const OrganizationsList = () => {
    const { organizations } = useAsyncValue() as OrganizationResponseType;
    const { state } = useNavigation();

    return <ul className={state === 'loading' ? `${classes.organizationsList} ${classes.disabled}` : classes.organizationsList}>
        {organizations.map((organization: Organization) => (
            <li key={organization.id}>
                <OrganizationItem organization={organization} />
            </li>
        ))}
    </ul>
}

export default OrganizationsList