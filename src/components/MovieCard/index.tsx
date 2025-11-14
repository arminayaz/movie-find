import { MovieCardClient } from './MovieCardClient';
import type { MovieCardProps } from './MovieCardClient';

export default function MovieCard({movie, thresholdConfig, variant, watchlistskeleton}: MovieCardProps) {
    return <MovieCardClient movie={movie} thresholdConfig={thresholdConfig} variant={variant} watchlistskeleton={watchlistskeleton}/>;
}