import { create } from 'zustand'

export const useMarketDataStore = create((set) => ({
    marketData: [],
    updateMarketData: (data, callback) => {
        set({ marketData: data });
        if (callback) callback();
    }
}))


