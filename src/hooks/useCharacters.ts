import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCharacters, getCharacter } from '@/services/api/rickAndMortyApi';
import { useCharacterStore } from '@/store/characterStore';
import { Character } from '@/schemas/character.schema';

export const useCharacters = () => {
    const queryClient = useQueryClient();
    // We can keep using the store for filters if needed, but for now we just return the query
    // const { filters } = useCharacterStore(); 

    const query = useInfiniteQuery({
        queryKey: ['characters'],
        queryFn: ({ pageParam = 1 }) => getCharacters(pageParam),
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

    // Optimistic updates helpers (if needed for local CRUD)
    const addCharacter = (newCharacter: Character) => {
        queryClient.setQueryData(['characters'], (oldData: any) => {
            if (!oldData) return oldData;
            return {
                ...oldData,
                pages: oldData.pages.map((page: any, index: number) => {
                    if (index === 0) {
                        return {
                            ...page,
                            results: [newCharacter, ...page.results],
                        };
                    }
                    return page;
                }),
            };
        });
    };

    const updateCharacter = (id: number, updatedCharacter: Partial<Character>) => {
        queryClient.setQueryData(['characters'], (oldData: any) => {
            if (!oldData) return oldData;
            return {
                ...oldData,
                pages: oldData.pages.map((page: any) => ({
                    ...page,
                    results: page.results.map((char: Character) =>
                        char.id === id ? { ...char, ...updatedCharacter } : char
                    ),
                })),
            };
        });
    };

    const deleteCharacter = (id: number) => {
        queryClient.setQueryData(['characters'], (oldData: any) => {
            if (!oldData) return oldData;
            return {
                ...oldData,
                pages: oldData.pages.map((page: any) => ({
                    ...page,
                    results: page.results.filter((char: Character) => char.id !== id),
                })),
            };
        });
    };

    // Note: These are basic implementations. For a real app, you might want to refetch or handle edge cases.

    return {
        ...query,
        data: query.data?.pages.flatMap((page) => page.results) || [],
        loadMore,
        isLoadingMore: query.isFetchingNextPage,
        hasMore: query.hasNextPage,
        addCharacter, // Expose if needed by UI
        updateCharacter,
        deleteCharacter,
    };
};

export const useCharacter = (id: number) => {
    return useQuery({
        queryKey: ['character', id],
        queryFn: () => getCharacter(id),
    });
};
