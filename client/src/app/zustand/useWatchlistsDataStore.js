import {create} from "zustand";

export const useWatchlistsDataStore = create((set) => ({
    watchlists: [],
    updateWatchlists : (watchlists) => set({watchlists: watchlists}),
    updateWatchlistWithTitle: (title, stock) => set((state) => ({
        watchlists: state.watchlists.map(watchlist => 
            watchlist.title === title 
                ? { ...watchlist, stocks: [...watchlist.stocks, stock] }
                : watchlist
        )
    })),
}))