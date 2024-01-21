import { useFetch } from '../hooks/useFetch';
import { MovieCard } from '../components';
import { useTitle } from '../hooks/useTitle';

export const MovieList = ({apiPath, title}) => {
    const {data: movies} = useFetch(apiPath);
    
    useTitle(title);
    
    return (
        <main>
            <section className='max-w-7xl mx-auto py-7'>
                <div className='flex flex-wrap justify-start other:justify-evenly'>
                    {movies?.map(movie => (
                        <MovieCard key={movie.id} movie={movie}/>    
                    ))}
                </div>
            </section>
        </main>
    );
}
