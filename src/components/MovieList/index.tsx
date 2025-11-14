import { MovieListClient } from './MovieListClient';
import type { MovieListClientProps } from './MovieListClient';

export default function MovieList({initialMovies}: MovieListClientProps) {
    return <MovieListClient initialMovies={initialMovies}/>;
}