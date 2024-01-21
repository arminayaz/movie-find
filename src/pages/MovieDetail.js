import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTitle } from '../hooks/useTitle';

export const MovieDetail = () => {
    const params = useParams();
    const [movie, setMovie] = useState({});
    const image_url = movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : 'https://picsum.photos/1500/2250';
    const url = `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
        }
    };
    
    useEffect(() => {
        async function fetchSingleMovie(){
            const response = await fetch(url, options);
            const json = await response.json();
            setMovie(json);
        }
        fetchSingleMovie();
    });
    
    useTitle(movie.title);

    return (
        <main>
            <section className='flex justify-around flex-wrap py-5'>
                <div className='max-w-sm'>
                    <img className='rounded' src={image_url} alt={movie.title} />
                </div>
                <div className='max-w-2xl text-gray-700 text-lg lg:text-left dark:text-white'>
                    <h1 className='text-4xl font-bold my-3 text-center'>{movie.title}</h1>
                    <p className='my-4'>{movie.overview}</p>
                    {movie.genres ? (
                        <p className='my-7 flex flex-wrap gap-2'>
                            {movie.genres.map((genre) => (
                                <span className='mr-2 border-gray-200 rounded dark:border-gray-600 p-2' key={genre.id}>{movie.genre}</span>
                            ))}
                        </p>
                    ) : ''}
                    <div className="flex items-center">
                        <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <p className="ms-2 text-gray-900 dark:text-white">{movie.vote_average}</p>
                        <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                        <span className="text-gray-900 dark:text-white">{movie.vote_count} reviews</span>
                    </div>
                    <p className='my-4'>
                        <span className='mr-2 font-bold'>Runtime:</span>
                        <span>{movie.runtime} min.</span>
                    </p>
                    <p className='my-4'>
                        <span className='mr-2 font-bold'>Budget:</span>
                        <span>${movie.budget}</span>
                    </p>
                    <p className='my-4'>
                        <span className='mr-2 font-bold'>Revenue:</span>
                        <span>${movie.revenue}</span>
                    </p>
                    <p className='my-4'>
                        <span className='mr-2 font-bold'>Releas Date:</span>
                        <span>{movie.release_date}</span>
                    </p>
                    <p className='my-4'>
                        <span className='mr-2 font-bold'>IMDB Code:</span>
                        <a href={`https://www.imdb.com/title/${movie.imdb_id}/`} target='_blank' rel='noreferrer'>{movie.imdb_id}</a>
                    </p>
                </div>
            </section>
        </main>
    );
}
