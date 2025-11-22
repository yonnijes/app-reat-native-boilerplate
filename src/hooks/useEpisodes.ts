import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getEpisodes, getEpisode } from '@/services/api/rickAndMortyApi';
import { useEpisodeStore } from '@/store/episodeStore';

export const useEpisodes = () => {
    // const { filters } = useEpisodeStore();

    const query = useInfiniteQuery({
        queryKey: ['episodes'],
        queryFn: ({ pageParam = 1 }) => getEpisodes(pageParam),
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

export const useEpisode = (id: number) => {
    return useQuery({
        queryKey: ['episode', id],
        queryFn: () => getEpisode(id),
    });
};
