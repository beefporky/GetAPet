import { defer, redirect, useParams } from 'react-router-dom';
import { organizationQuery, useOrganizationQuery } from '../../../store/organizations-query';
import { isTokenValid } from '../../../utils/auth';
import { queryClient } from '../../../utils/utils';
import Loading from '../../../components/ui/Loading/Loading';
import classes from './OrganizationDetail.module.css';
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";

const OrganizationDetailsPage = () => {
    const { organizationId } = useParams<{ organizationId: string }>();
    const { data, isLoading } = useOrganizationQuery(organizationId!);

    let content = <Loading />;

    const socialMedia = [
        {
            name: 'facebook',
            icon: <FaFacebook />
        },
        {
            name: 'twitter',
            icon: <FaTwitter />
        },
        {
            name: 'youtube',
            icon: <FaYoutube />
        },
        {
            name: 'instagram',
            icon: <FaInstagram />
        },
        {
            name: 'pinterest',
            icon: <FaPinterest />
        }
    ];

    const days = [
        {
            "day": "monday",
            "name": "Monday"
        },
        {
            "day": "tuesday",
            "name": "Tuesday"
        },
        {
            "day": "wednesday",
            "name": "Wednesday"
        },
        {
            "day": "thursday",
            "name": "Thursday"
        },
        {
            "day": "friday",
            "name": "Friday"
        },
        {
            "day": "saturday",
            "name": "Saturday"
        },
        {
            "day": "sunday",
            "name": "Sunday"
        }
    ];

    if (!isLoading && data) {
        content = <main className={classes.organizationDetail}>
            <img src={data.photos[0].large} alt="" />
            <h3 className={classes.orgName}>{data?.name}</h3>
            <p>{data?.mission_statement}</p>
            <div className={classes.scheduleContainer}>
                <h4>Clinic Hours</h4>
                {days.map((day) => <p>{day.name}: <span className={classes.schedule}>{data.hours[day.day]}</span></p>)}
            </div>
            <address className={classes.orgAddress}>
                <h4>Address</h4>
                <p>{data.address.address1}</p>
                <p>{data.address.city}, {data.address.state} {data.address.postcode}</p>
                <a href={`mailto:${data.email}`}>{data.email}</a>
                <p>{data.phone}</p>
            </address>
            <div className={classes.socialMedia}>
                {socialMedia.map((media) => data.social_media[media.name as keyof typeof data.social_media] && <a href={data.social_media[media.name as keyof typeof data.social_media]} target="_blank">{media.icon}</a>)}
            </div>
        </main>
    }

    return (
        content
    )
}

export default OrganizationDetailsPage

type ParamsType = {
    params: {
        organizationId: string;
    }
    request: {
        url: string;
    }
}

export async function loader({ request, params }: ParamsType) {
    const newUrl = new URL(request.url);
    const pathname = newUrl.pathname + newUrl.search;
    const query = organizationQuery(params.organizationId);
    if (!isTokenValid(pathname)) {
        return redirect('/login');
    }
    return defer({
        animal: queryClient.getQueryData(query.queryKey) ?? queryClient.fetchQuery(query)
    });
}