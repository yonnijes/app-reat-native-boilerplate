import { create } from 'zustand';
import { Episode } from '@/schemas/episode.schema';

interface EpisodeState {
    // Add filters or global config here
}

export const useEpisodeStore = create<EpisodeState>((set) => ({
    // Initial state
}));
