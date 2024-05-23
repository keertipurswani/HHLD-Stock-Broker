import {create} from "zustand";

export const useCurrentStockDataStore = create((set) => ({
    currentStock: {name: '', instrumentKey: ''},
    updateCurrentStock : (stock) => set({currentStock: stock})
}))