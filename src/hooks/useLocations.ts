import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getLocations, getLocation } from '@/services/api/rickAndMortyApi';
import { useLocationStore } from '@/store/locationStore';

export const useLocations = () => {
    // const { filters } = useLocationStore();

    const query = useInfiniteQuery({
        queryKey: ['locations'],
        queryFn: ({ pageParam = 1 }) => getLocations(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.info.next) {
                const url = new URL(lastPage.info.next);
                return Number(url.searchParams.get('page'));
            }
            return undefined;
        },
    });

    const loadMore = () => {
        if (query.hasNextPage && !query.isFetchingNextPage) {
            query.fetchNextPage();
        }
    };

    return {
        ...query,
        data: query.data?.pages.flatMap((page) => page.results) || [],
        loadMore,
        isLoadingMore: query.isFetchingNextPage,
        hasMore: query.hasNextPage,
    };
};

export const useLocation = (id: number) => {
    return useQuery({
        queryKey: ['location', id],
        queryFn: () => getLocation(id),
    });
};
