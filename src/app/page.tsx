import { Metadata } from 'next';
import { getMoviesByPath } from '@/lib/tmdb';
import MovieList from '@/components/MovieList';

export const metadata: Metadata = {
    title: 'Now Playing',
    description: 'Movies now playing in theaters',
};

export default async function HomePage() {
    const data = await getMoviesByPath('movie/now_playing');
    return <MovieList initialMovies={data.results} />;
}
