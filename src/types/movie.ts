import type { Video } from './video';

export interface Movie {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    runtime: number;
    budget: number;
    revenue: number;
    imdb_id?: string | null;
    genre_ids?: number[];
    genres?: {id: number; name: string;}[];
    vote_average: number;
    vote_count?: number;
    popularity?: number;
    adult?: boolean;
    video?: boolean;
    videos?: {results: Video[];};
    backdrop_path?: string | null;
}

export interface SearchMovie {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    runtime: number;
    budget: number;
    revenue: number;
    genre_ids?: number[];
    vote_average: number;
    vote_count?: number;
    popularity?: number;
    adult?: boolean;
    video?: boolean;
    backdrop_path?: string | null;
}
