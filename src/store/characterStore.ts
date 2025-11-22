import { create } from 'zustand';
import { Character } from '@/schemas/character.schema';

interface CharacterState {
    // Add filters or global config here
    // filters: CharacterFilters;
    // setFilters: (filters: CharacterFilters) => void;
}

export const useCharacterStore = create<CharacterState>((set) => ({
    // Initial state
}));
