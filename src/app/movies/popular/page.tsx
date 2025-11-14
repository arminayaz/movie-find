import { Metadata } from 'next';
import { getMoviesByPath } from '@/lib/tmdb';
import MovieList from '@/components/MovieList';

export const metadata: Metadata = {
    title: 'Popular Movies',
    description: 'Movies that are popular worldwide',
};

export default async function PopularPage() {
    const data = await getMoviesByPath('movie/popular');
    return <MovieList initialMovies={data.results} />;
}
