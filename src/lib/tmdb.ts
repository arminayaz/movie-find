import { cache } from 'react';
import type { Movie as TMDBMovie } from '@/types/movie';

export interface TMDBResponse {
    page: number;
    results: TMDBMovie[];
    total_pages: number;
    total_results?: number;
}

const TMDB_API_BASE = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const headers = {accept: 'application/json', Authorization: `Bearer ${TMDB_API_KEY}`,};

export const getMovieById = cache(async (id: string) => {
    if(!TMDB_API_KEY) throw new Error('API Key not configured');

    const [movieRes, videosRes] = await Promise.all([
        fetch(`${TMDB_API_BASE}/movie/${id}?language=en-US`, { 
            headers, next: {revalidate: 60}
        }),
        fetch(`${TMDB_API_BASE}/movie/${id}/videos?language=en-US`, { 
            headers, next: {revalidate: 60}
        }),
    ]);

    const movieData = await movieRes.json();
    const videosData = await videosRes.json();

    return {...movieData, videos: videosData};

});

export async function getMoviesByPath(apiPath: string, page = 1): Promise<{results: TMDBMovie[]; total_pages: number; page: number;}> {
    if(!TMDB_API_KEY) throw new Error('Missing TMDB API key');

    const url = `${TMDB_API_BASE}/${apiPath}?language=en-US&page=${page}`;
    
    const response = await fetch(url, {headers, next: {revalidate: 60}});
    if(!response.ok) throw new Error('Failed to fetch movies');
    
    const data = await response.json();
    
    return {results: data.results || [], total_pages: data.total_pages || 1, page: data.page || 1,};
}

export async function searchMovies(query: string, page: number = 1): Promise<{results: TMDBMovie[]; total_pages: number; page: number;}> {
    if(!TMDB_API_KEY) throw new Error('API Key not configured');

    const url = `${TMDB_API_BASE}/search/movie?language=en-US&page=${page}&query=${encodeURIComponent(query)}`;

    if(!query.trim()) return {results: [], total_pages: 0, page: 1,};

    const response = await fetch(url, {headers, next: {revalidate: 60}});

    if(!response.ok) throw new Error('Failed to search movies');

    const data = await response.json();
    return {results: data.results || [], total_pages: data.total_pages || 1, page: data.page || 1,};
}

export async function fetchSearchMoviesPages(query: string, pagesToFetch: number = 4) {
    if(!query.trim()) return {results: [], initialTotalPages: 0,};
    
    let allResults: TMDBMovie[] = [];
    let totalPages = 1;

    for(let page = 1; page <= Math.min(totalPages, pagesToFetch); page++) {
        const data = await searchMovies(query, page); 

        if(page === 1) totalPages = data.total_pages;

        if(Array.isArray(data.results)) allResults = allResults.concat(data.results);

        if(page >= totalPages || page >= pagesToFetch) break;
    }
    
    return {results: allResults, initialTotalPages: totalPages,};
}