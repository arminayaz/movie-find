import { Metadata } from 'next';
import { fetchSearchMoviesPages } from '@/lib/tmdb';
import SearchPageClient from '@/components/SearchPageClient';
import type { Movie } from '@/types/movie';

type Props = {searchParams: Promise<{q?: string}>};

export async function generateMetadata({searchParams}: Props): Promise<Metadata> {
    const params = await searchParams;
    const query = params.q?.trim() || '';

    return {
        title: query ? `Search Results for ${query}`: 'Search',
        description: query ? `Search Results for ${query}`: 'Search for movies',
    };
} 

export default async function SearchPage({searchParams}: Props) {
    const params = await searchParams;
    const searchQuery = params.q?.trim() || '';

    let movies: Movie[] = [];

    if(searchQuery) {
        const data = await fetchSearchMoviesPages(searchQuery);
        movies = data.results;
    }
    
    return <SearchPageClient initialMovies={movies} searchQuery={searchQuery} />;
}