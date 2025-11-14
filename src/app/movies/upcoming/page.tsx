import { Metadata } from 'next';
import { getMoviesByPath } from '@/lib/tmdb';
import MovieList from '@/components/MovieList';

export const metadata: Metadata = {
    title: 'Upcoming Movies',
    description: 'Movies that are going to be released',
};

export default async function UpcomingPage() {
    const data = await getMoviesByPath('movie/upcoming');
    return <MovieList initialMovies={data.results} />;
}