import { useSearchParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { useTitle } from '../hooks/useTitle';
import { MovieCard } from '../components';

export const Search = ({apiPath}) => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q');
    const {data: movies} = useFetch(apiPath, searchQuery);

    useTitle(`Search Resault for ${searchQuery}`);
    
    return (
        <main>
            <section className='py-7'>
                <p className='text-3xl text-gray-700 dark:text-white'>{movies.length === 0 ? `Nothing found related to "${searchQuery}"` : `Results for "${searchQuery}"`}</p>
            </section>
            <section className='max-w-7xl mx-auto py-7'>
                <div className='flex flex-wrap justify-start'>
                    {movies?.map(movie => (
                        <MovieCard key={movie.id} movie={movie}/>    
                    ))}
                </div>
            </section>
        </main>
    );
}
