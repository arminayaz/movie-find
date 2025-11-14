import { configureStore } from '@reduxjs/toolkit';
import watchlistReducer from './slices/watchlistSlice';
import type { WatchlistState } from './slices/watchlistSlice';

function loadFromLocalStorage(): {watchlist: WatchlistState} | undefined {
    try {
        if(typeof window === 'undefined') return undefined;
        const state = localStorage.getItem('reduxState');
        return state ? JSON.parse(state) : undefined;
    }
    catch {return undefined;}
}


function saveToLocalStorage(state: RootState) {
    try {if(typeof window != 'undefined') localStorage.setItem('reduxState', JSON.stringify(state));}
    catch {}
}

export const store = configureStore({
    reducer: {watchlist: watchlistReducer},
    preloadedState: loadFromLocalStorage(),
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;