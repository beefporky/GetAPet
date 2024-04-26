import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getOrganization, getOrganizations } from "../services/organization";
import { Pagination } from "../utils/utils";
import { Organization } from "../models/Organization";

export const organizationsQuery = (filters: object) => {
    return {
        queryKey: ['organizations', filters],
        queryFn: ({ pageParam }: { pageParam: number }) => {
            const newFilters = JSON.parse(JSON.stringify(filters));
            newFilters.page = pageParam;
            return getOrganizations(newFilters);
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage: { pagination: Pagination, organizations: Organization[] }) => {
            return lastPage.pagination.current_page <= lastPage.pagination.total_pages ? lastPage.pagination.current_page + 1 : undefined;
        }
    }
}

export const organizationQuery = (id: string) => {
    return {
        queryKey: ['organization', id],
        queryFn: () => getOrganization(id)
    }
}

export const useOrganizationsQuery = (filters: object) => {
    return useInfiniteQuery(organizationsQuery(filters));
}

export const useOrganizationQuery = (id: string) => {
    return useQuery(organizationQuery(id));
}