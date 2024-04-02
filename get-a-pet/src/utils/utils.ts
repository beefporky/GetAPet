export const convertObjectToStringQuery = (filters: object) => {
    const filter = Object.entries(filters).map(([key, value]) => {
        return `${key}=${value}`;
    }).join('&');
    return filter;
}
