import ky from 'ky';
import { CharacterSchema, Character } from '@/schemas/character.schema';
import { LocationSchema, Location } from '@/schemas/location.schema';
import { EpisodeSchema, Episode } from '@/schemas/episode.schema';
import { z } from 'zod';

const api = ky.create({
    prefixUrl: 'https://rickandmortyapi.com/api',
});

export interface PaginatedResponse<T> {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: T[];
}

const InfoSchema = z.object({
    count: z.number(),
    pages: z.number(),
    next: z.string().nullable(),
    prev: z.string().nullable(),
});

const CharactersResponseSchema = z.object({
    info: InfoSchema,
    results: z.array(CharacterSchema),
});

const LocationsResponseSchema = z.object({
    info: InfoSchema,
    results: z.array(LocationSchema),
});

const EpisodesResponseSchema = z.object({
    info: InfoSchema,
    results: z.array(EpisodeSchema),
});

// Characters
export const getCharacters = async (
    page = 1
): Promise<PaginatedResponse<Character>> => {
    const response = await api.get(`character?page=${page}`).json();
    return CharactersResponseSchema.parse(response);
};

export const getCharacter = async (id: number): Promise<Character> => {
    const response = await api.get(`character/${id}`).json();
    return CharacterSchema.parse(response);
};

// Locations
export const getLocations = async (
    page = 1
): Promise<PaginatedResponse<Location>> => {
    const response = await api.get(`location?page=${page}`).json();
    return LocationsResponseSchema.parse(response);
};

export const getLocation = async (id: number): Promise<Location> => {
    const response = await api.get(`location/${id}`).json();
    return LocationSchema.parse(response);
};

// Episodes
export const getEpisodes = async (
    page = 1
): Promise<PaginatedResponse<Episode>> => {
    const response = await api.get(`episode?page=${page}`).json();
    return EpisodesResponseSchema.parse(response);
};

export const getEpisode = async (id: number): Promise<Episode> => {
    const response = await api.get(`episode/${id}`).json();
    return EpisodeSchema.parse(response);
};
