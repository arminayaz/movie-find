'use client';

import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { MovieCardSkeleton } from './MovieCardSkeleton';
import { addMovie, removeMovie } from '@/store/slices/watchlistSlice';
import { clampText } from '@/lib/helperFunctions';
import type { Movie } from '@/types/movie';
import type { WatchListMovie } from '@/store/slices/watchlistSlice';

export interface MovieCardProps {
    movie: Movie | WatchListMovie;
    thresholdConfig: number;
    variant: string;
    watchlistskeleton: React.ReactNode;
}

export const MovieCardClient = ({movie, thresholdConfig = 0.5, variant = 'default', watchlistskeleton}: MovieCardProps) => {
    const {id, original_title, overview, poster_path} = movie;
    const image_url = poster_path ? `https://image.tmdb.org/t/p/original${poster_path}` : 'https://picsum.photos/1500/2250';
    const [contentLoaded, setContentLoaded] = useState(false);
    const [isDelayCompelete, setIsDelayCompelete] = useState(false);
    const {ref, inView} = useInView({triggerOnce: true, threshold: thresholdConfig,});
    const isWatchlist = variant === 'watchlist';
    
    const handleImage = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        setTimeout(() => {
            if(e.type === 'load') setContentLoaded(true);
            else if(e.type === 'error') {
                const target = e.target as HTMLImageElement;
                console.error('Image failed to load:', target.src);
                setContentLoaded(true);
            }
            setIsDelayCompelete(true);
        }, 500);
    };
    
    const dispatch = useAppDispatch();
    const movieList = useAppSelector(state => state.watchlist.movieList);
    const isAdded = movieList.some(item => item.id === movie.id);
    const handleButtonClick = () => {
        if(isAdded) dispatch(removeMovie({id: movie.id}));
        else dispatch(addMovie(movie));
    };
    
    return (
        <div ref={ref} className={`flex flex-col items-stretch ${isWatchlist ? 'lg:w-[240px] xl:w-[185px] xl:h-[full] lg:h-[490px]' : 'w-full h-[975px] md:h-[1050px] min-w-2xs'} bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700`}>
            {contentLoaded && isDelayCompelete ? 
                (<>
                    <Link className='flex-1 aspect-[3/2]' href={`/movie/${id}`}>
                        <img className={`rounded-t-xl w-full ${isWatchlist ? 'xl:h-[full] lg:h-[290px]' : 'md:h-[590px]'} object-cover`} src={image_url} alt={original_title} />
                    </Link>
                    <div className='flex flex-col flex-1 gap-[20px] items-center justify-center h-full p-5'>
                        <Link className={`${isWatchlist ? 'h-[100px]' : 'w-full md:flex-[0.75]'}`} href={`/movie/${id}`}>
                            <h5 className={` ${isWatchlist ? 'text-m' : 'text-2xl'} font-bold tracking-tight text-left text-gray-900 dark:text-white line-clamp-3`}>{clampText(original_title, 92)}</h5>
                        </Link>
                        {!isWatchlist && (<p className='w-full h-full flex-2 font-normal text-left text-gray-700 dark:text-gray-400'>{clampText(overview, 350)}</p>)}
                        <button onClick={handleButtonClick} className={`flex items-center ${isWatchlist ? 'justify-center w-[55px]' : 'w-full'} px-4 py-2 rounded-xl ${isAdded ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium cursor-pointer`}>
                            {isAdded ?
                                (<>
                                    <svg className={`w-4 h-4 ${isWatchlist ? '' : 'mr-2'} text-white dark:text-white`} aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
                                        <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 12h14'/>
                                    </svg>
                                    {!isWatchlist && (<p>Remove from Watchlist</p>)}
                                </>)
                                :
                                (<>
                                    <svg className='w-4 h-4 mr-2 text-white dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
                                        <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 12h14m-7 7V5'/>
                                    </svg>
                                    {!isWatchlist && (<p>Add to Watchlist</p>)}
                                </>)
                            }
                        </button>
                    </div>
                </>)
                :
                (<>
                    {!isWatchlist ? <MovieCardSkeleton /> : watchlistskeleton}
                    {inView && <img className='hidden' src={image_url} alt={original_title} onLoad={handleImage} onError={handleImage} />}
                </>)
            }
        </div>
    );
}
