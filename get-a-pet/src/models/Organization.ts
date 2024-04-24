import { Photo } from "./Common";

export type Organization = {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: {
        address1: string | null;
        address2: string | null;
        city: string;
        state: string;
        postcode: string;
        country: string;
    };
    hours: Hours;
    url: string | null;
    website: string;
    mission_statement: string;
    social_media: SocialMedia;
    adoption: {
        policy: string | null;
        url: string | null;
    }
    photos: Photo[];
    distance: string | null;
    _links: {
        self: {
            href: string;
        },
        animals: {
            href: string;
        }
    }
}

export type Hours = {
    monday: string | null;
    tuesday: string | null;
    wednesday: string | null;
    thursday: string | null;
    friday: string | null;
    saturday: string | null;
    sunday: string | null;
}

export type SocialMedia = {
    facebook: string | null;
    twitter: string | null;
    youtube: string | null;
    instagram: string | null;
    pinterest: string | null;
}