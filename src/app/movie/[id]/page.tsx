import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MovieDetail from '@/components/MovieDetail';
import { getMovieById } from '@/lib/tmdb';

type Props = {params: Promise<{id: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const {id} = await params;
    const movieData = await getMovieById(id);

    if(!movieData) return {title: 'Movie not found'};
    
    return {
        title: movieData?.title || 'Movie Details',
        description: movieData?.overview,
    };
}

export default async function MoviePage({params}: Props) {
    const {id} = await params;
    const movieData = await getMovieById(id);

    if(!movieData) notFound();

    return (
        <main>
            <section className='flex justify-around flex-wrap py-5 gap-20'>
                <MovieDetail movie={movieData}/>
            </section>
        </main>
    );
}