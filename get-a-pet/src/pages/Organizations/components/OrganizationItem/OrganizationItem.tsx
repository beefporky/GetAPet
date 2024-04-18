import classes from './OrganizationItem.module.css';
import { Organization } from "../../../../models/Organization"
import orgImagePlaceholder from '../../../../assets/organization-placeholder.png';
import { Link } from 'react-router-dom';

type OrganizationItemProps = {
    organization: Organization
}

const OrganizationItem = ({ organization }: OrganizationItemProps) => {
    console.log(organization);
    return (
        <Link to={`/organizations/${organization.id}`} className={classes.organizationItem}>
            <div className={classes.imageContainer}>
                <img src={organization.photos.length > 0 ? organization.photos[0].large : orgImagePlaceholder} alt={organization.name} />
            </div>
            <div className={classes.detailsContainer}>
                <h2>{organization.name}</h2>
                <p>{organization.mission_statement}</p>
                <address className={classes.orgAddress}>
                    <p>{organization.address.city}, </p>
                    <p>{organization.address.state}, {organization.address.country}</p>
                </address>
            </div>
        </Link>
    )
}

export default OrganizationItem