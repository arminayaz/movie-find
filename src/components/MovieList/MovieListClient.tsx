'use client';

import MovieCard from '@/components/MovieCard';
import type { Movie } from '@/types/movie';

export interface MovieListClientProps {initialMovies: Movie[];}

export const MovieListClient = ({initialMovies}: MovieListClientProps) => {
    return (
        <main>
            <section className='max-w-7xl lg:max-w-7xl mx-auto py-7'>
                <div className='grid sm:grid-cols-2 sm:landscape:grid-cols-2 grid-cols-1 landscape:grid-cols-3 lg:grid-cols-3 lg:landscape:grid-cols-3 gap-5 md:gap-6'>
                    {initialMovies?.map(movie => (<MovieCard key={movie.id} movie={movie} thresholdConfig={0} variant={'default'} watchlistskeleton={undefined} />))}
                </div>
            </section>
        </main>
    );
}
