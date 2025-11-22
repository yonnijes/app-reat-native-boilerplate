import { create } from 'zustand';
import { Location } from '@/schemas/location.schema';

interface LocationState {
    // Add filters or global config here
}

export const useLocationStore = create<LocationState>((set) => ({
    // Initial state
}));
