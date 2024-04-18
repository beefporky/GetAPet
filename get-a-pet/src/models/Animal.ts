export type Photo = {
    small: string;
    medium: string;
    large: string;
    full: string;
}

export type Breed = {
    primary: string;
    secondary?: null;
    mixed: boolean;
    unknown: boolean;
}

export type AnimalAttribute = {
    spayed_neutered: boolean;
    house_trained: boolean;
    declawed: boolean;
    special_needs: boolean;
    shots_current: boolean;
}

export type AnimalType = {
    name: string;
    coats: string[];
    colors: string[];
    genders: "Male" | "Female" | "Unknown";
    _links: {
        self: {
            href: string;
        },
        breeds: {
            href: string;
        }
    }
} 

export type AnimalAge = "baby" | "young" | "adult" | "senior";

export type AnimalGender = "male" | "female" | "unknown";

export type AnimalSize = "small" | "medium" | "large" | "xlarge";

export type AnimalBreeds = {
    "name": string;
    "_links": {
        "type": {
            "href": string;
        }
    }
}

export type AnimalEnvironment = {
    "children": boolean;
    "dogs": boolean;
    "cats": boolean;
}

export type AnimalContact = {
    email: string;
    phone: string;
    address: {
        address1: string;
        address2: string;
        city: string;
        state: string;
        postcode: string;
        country: string;
    }
}

export type AnimalColor = {
    primary: string;
    secondary: string;
    tertiary: string;
}

export type AnimalVideo = {
    embed: string;
}

export type Animal = {
    id: string;
    name: string;
    type: string;
    species: string;
    url: string;
    breeds: Breed;
    description: string;
    age: string;
    photos: Photo[];
    size: string;
    coat: string;
    attributes: AnimalAttribute;
    environment: AnimalEnvironment,
    tags: string[];
    videos: AnimalVideo[];
    status: string;
    contact: AnimalContact;
    gender: string;
    colors: AnimalColor;
}