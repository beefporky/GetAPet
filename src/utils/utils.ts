import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false
        }
    }
});

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

export const extractVideoSrcFromHtmlEmbed = (embed: string) => {
    const div = document.createElement('div');
    div.innerHTML = embed;
    if (div.firstChild?.nodeName === 'VIDEO') {
        return [(div.firstChild.firstChild as HTMLSourceElement).src, 'video']
    } else {
        return [(div.firstChild as HTMLIFrameElement).src, 'iframe'];
    }
}

export type Pagination = {
    count_per_page: number;
    total_count: number;
    current_page: number;
    total_pages: number;
    _links: object;
}