'use client';

import Image from 'next/image';
import { formatMoney, formatReleaseYears, formatTime, formatReview } from '@/lib/helperFunctions';
import { ThumbnailPlugin } from './ThumbnailPlugin';
import { useKeenSlider } from 'keen-slider/react';
import type { Movie } from '@/types/movie';
import 'keen-slider/keen-slider.min.css';

export interface MovieDetailProps {movie: Movie};

export const MovieDetailClient = ({movie}: MovieDetailProps) => {
    const image_url = movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : 'https://picsum.photos/1500/2250';
    const movieTrailers = movie.videos?.results?.filter(
        (trailer) => trailer.site === 'YouTube' && trailer.name.match(/\bofficial trailer\b|\btrailer\b/i)
    ) || [];
    const firstMovieTrailer = movieTrailers[0];
    const lastMovieTrailer = movieTrailers[movieTrailers.length - 1];
    const trailers = [firstMovieTrailer, lastMovieTrailer].filter(Boolean).filter((v, i, arr) => arr.indexOf(v) === i);

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        breakpoints: {
            '(max-width: 650px)': {
                slides: {perView: 1, spacing: 10},
            },
        },
    });
    const [thumbnailRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        slides: {perView: 4, spacing: 5,},
        breakpoints: {
            '(min-width: 601px)': {
                slides: {perView: 3, spacing: 30},
                created(slider) {
                    slider.container.style.setProperty('--thumb-height', '250px');
                },
            },
            '(max-width: 600px)': {
                slides: {perView: 2, spacing: 30},
                created(slider) {
                    slider.container.style.setProperty('--thumb-height', '105px');
                },
            },            
        } 
    }, [ThumbnailPlugin(instanceRef)]);

    return (
        <>
            <div className='animate-fade-in flex justify-center xl:justify-between items-start flex-wrap w-full gap-20'>
                <div className='max-w-sm flex-grow h-full 2xs:h-[unset] overflow-y-auto border border-gray-200 rounded-xl dark:border-gray-700'>
                    <Image className='rounded-xl' src={image_url} alt={movie?.title} width='382' height='573' />
                </div>
                <div className='xl:max-w-3xl max-w-7xl w-full text-gray-700 text-lg lg:text-left dark:text-white'>
                    <h1 className='text-4xl font-bold my-3 text-left'>{movie?.title} {movie?.release_date && `(${formatReleaseYears(movie)})`}</h1>
                    <p className='my-4'>{movie.overview}</p>
                    {movie.genres ? (
                        <p className='my-7 flex flex-wrap gap-2'>
                            {movie.genres.map((genre) => (
                                <span className='mr-2 border-2 border-gray-200 rounded-xl dark:border-gray-600 py-1 px-2' key={genre.id}>{genre.name}</span>
                            ))}
                        </p>
                    ) : ''}
                    <div className='flex items-center'>
                        <svg className='w-4 h-4 text-yellow-300 me-1' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 22 20'>
                            <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z'/>
                        </svg>
                        <p className='text-gray-900 dark:text-white'>{formatReview(movie.vote_average)}</p>
                        <span className='w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400'></span>
                        <span className='text-gray-900 dark:text-white'>{movie.vote_count} reviews</span>
                    </div>
                    <p className='my-4'>
                        <span className='mr-2 font-bold'>Runtime:</span>
                        <span>{formatTime(movie.runtime)}</span>
                    </p>
                    <p className='my-4'>
                        <span className='mr-2 font-bold'>Budget:</span>
                        <span>{formatMoney(movie.budget)}</span>
                    </p>
                    <p className='my-4'>
                        <span className='mr-2 font-bold'>Revenue:</span>
                        <span>{formatMoney(movie.revenue)}</span>
                    </p>
                    <p className='my-4'>
                        <span className='mr-2 font-bold'>Releas Date:</span>
                        <span>{movie.release_date}</span>
                    </p>
                    <p className='my-4'>
                        <span className='mr-2 font-bold'>IMDB Code:</span>
                        {movie.imdb_id ?
                            (<a className='inline-flex flex-row items-center' href={`https://www.imdb.com/title/${movie.imdb_id}/`} target='_blank' rel='noreferrer'>
                                <span>{movie.imdb_id}</span>
                                <svg className='w-4 h-4 ms-1 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
                                    <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961'/>
                                </svg>
                            </a>)
                            :
                            (<span>NA</span>)
                        }
                    </p>
                </div>
            </div>
            {movieTrailers[0] &&
                (<div className='animate-fade-in flex flex-col justify-around flex-wrap w-full h-full gap-5'>
                    <h2 className='text-3xl font-bold'>Trailers</h2>
                    <div ref={sliderRef} className='keen-slider'>
                        {trailers.map((video) => (
                            <div key={video.id} className='keen-slider__slide md:h-[55vw] xl:landscape:h-[36.54vw] h-[55vw]'>
                                <iframe
                                    className='rounded-xl border border-gray-200 dark:border-gray-700 w-full h-full'
                                    src={`https://www.youtube.com/embed/${video.key}`}
                                    title={video.name}
                                    allowFullScreen
                                />
                            </div>
                        ))}
                    </div>
                    {movieTrailers.length > 1 &&
                        (<div ref={thumbnailRef} className='keen-slider thumbnail'>
                            {trailers.map((video, idx) => (
                                <div key={video.id} className={`keen-slider__slide number-slide${idx + 1} cursor-pointer border-2 rounded-xl`} style={{height: 'var(--thumb-height)'}}>
                                    <img
                                        src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                                        alt={video.name}
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                            ))}
                        </div>)
                    }
                </div>)
            }
        </>
    );
}
