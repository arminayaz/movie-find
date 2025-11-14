import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Movie } from '@/types/movie';

export type WatchListMovie = Pick<Movie, 'id' | 'title' | 'original_title' | 'poster_path' | 'release_date' | 'overview'>;

export interface WatchlistState {movieList: WatchListMovie[];}
const initialState: WatchlistState = {movieList: []};

const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState,
    reducers: {
        addMovie: (state, action: PayloadAction<WatchListMovie>) => {
            const exists = state.movieList.some(movie => movie.id === action.payload.id);
            if(!exists) state.movieList.push(action.payload);
        },
        removeMovie: (state, action: PayloadAction<{id: number}>) => {
            state.movieList = state.movieList.filter(movie => movie.id !== action.payload.id);
        },
    },
});

export const { addMovie, removeMovie } = watchlistSlice.actions;
export default watchlistSlice.reducer;
