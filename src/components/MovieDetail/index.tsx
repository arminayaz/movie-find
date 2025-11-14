import type { Movie } from '@/types/movie';
import { MovieDetailLoader } from './MovieDetailLoader';

export default function MovieDetail({movie}: {movie: Movie}) {
    return <MovieDetailLoader movie={movie} />;
}