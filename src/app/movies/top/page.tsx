import { Metadata } from 'next';
import { getMoviesByPath } from '@/lib/tmdb';
import MovieList from '@/components/MovieList';

export const metadata: Metadata = {
    title: 'Top Rated Movies',
    description: 'Movies that are rated the most in IMDB',
};

export default async function TopRatedPage() {
    const data = await getMoviesByPath('movie/top_rated');
    return <MovieList initialMovies={data.results} />;
}