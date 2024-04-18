import { Photo } from "./Animal";
export type Organization = {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: {
        address1: string;
        address2: string;
        city: string;
        state: string;
        postcode: string;
        country: string;
    };
    hours: Hours;
    url: string;
    website: string;
    mission_statement: string;
    social_media: SocialMedia;
    adoption: {
        policy: string;
        url: string;
    }
    photos: Photo[];
    distance: string;
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
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
}

export type SocialMedia = {
    facebook: string;
    twitter: string;
    youtube: string;
    instagram: string;
    pinterest: string;
}