export const convertObjectToStringQuery = (filters: object) => {
    const filter = Object.entries(filters).map(([key, value]) => {
        return `${key}=${encodeURIComponent(value)}`;
    }).join('&');
    return filter;
}


export const removeEmptyObjectValues = (obj: object) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return Object.fromEntries(Object.entries(obj).filter(([_, val]) => val !== '' && val !== null && val !== undefined));
}