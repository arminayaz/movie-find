'use client';

import { useState, useEffect, useMemo } from 'react';
import MovieCard from '@/components/MovieCard';
import { useAppSelector } from '@/store/hooks';
import { WatchlistSkeleton } from './WatchlistSkeleton';

export function WatchlistClient() {
    const watchlistMovies = useAppSelector((state) => state.watchlist.movieList);
    const [mounted, setMounted] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 12;

    useEffect(() => setMounted(true), []);

    useEffect(() => {setCurrentPage(1)}, [watchlistMovies.length]);

    const sortedMovies = useMemo(() => {return [...watchlistMovies].reverse()}, [watchlistMovies]);
    const totalPages = Math.ceil(sortedMovies.length / moviesPerPage);
    const startIndex = (currentPage - 1) * moviesPerPage;
    const currentMovies = useMemo(() => {
        return sortedMovies.slice(startIndex, startIndex + moviesPerPage);
    }, [sortedMovies, startIndex]);

    const handlePageChange = (page: number) => {
        if(page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
    };

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 4;

        if(totalPages <= maxVisible) for(let i = 1; i <= totalPages; i++) pages.push(i);
        else {
            if(currentPage <= 3) {
                for(let i = 1; i <= 4; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            }
            else if(currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for(let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            }
            else {
                pages.push(1);
                pages.push('...');
                pages.push(currentPage - 1);
                pages.push(currentPage);
                pages.push(currentPage + 1);
                pages.push('...');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    return (
        <main className='min-h-screen bg-gray-100 dark:bg-gray-800'>
            <section className='max-w-7xl mx-auto py-7'>
                <h1 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center'>My Watchlist</h1>
                {mounted && sortedMovies.length > 0 && 
                    (<p className='text-center text-gray-600 dark:text-gray-400 mb-6'>
                        Showing {startIndex + 1}-{Math.min(startIndex + moviesPerPage, watchlistMovies.length)} of {sortedMovies.length} {sortedMovies.length === 1 ? 'movie' : 'movies'}
                    </p>)
                }
                <div className='grid grid-cols-2 xl:grid-cols-6 md:grid-cols-4 gap-5 justify-stretch other:justify-evenly'>
                    {mounted &&
                        (watchlistMovies.length > 0 ? 
                            (currentMovies.map(movie => (<MovieCard key={movie.id} movie={movie} thresholdConfig={0} variant='watchlist' watchlistskeleton={<WatchlistSkeleton />}/>)))
                            :
                            (<p className='col-span-full text-center w-full text-gray-500 dark:text-gray-400'>Your watchlist is empty.</p>)
                        )
                    }
                </div>
                {mounted && watchlistMovies.length > 0 && totalPages > 1 && 
                    (<div className='flex justify-center items-center gap-2 mt-8 space-x-4'>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className='px-4 py-2 text-white bg-blue-600 dark:bg-blue-700 rounded-xl disabled:opacity-50 shadow'
                        >
                            Prev
                        </button>
                        <div className='hidden md:flex gap-3'>
                            {getPageNumbers().map((page, idx) => typeof page === 'number' ?
                                (<button
                                    key={idx}
                                    onClick={() => handlePageChange(page)}
                                    className={
                                        `p-2 rounded-lg transition-colors shadow rounded-xl w-[40px] h-[40px] ${currentPage === page ?
                                        'bg-blue-600 text-white'
                                        :
                                        'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'}`
                                    }
                                >
                                    {page}
                                </button>)
                                :
                                (<span key={idx} className='px-2 py-2 text-gray-500'>{page}</span>)
                            )}
                        </div>
                        <div className='flex md:hidden gap-1'>
                            <span className='text-gray-700 dark:text-white'>
                                Page {currentPage} of {totalPages}
                            </span>
                        </div>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className='px-4 py-2 text-white bg-blue-600 dark:bg-blue-700 rounded-xl disabled:opacity-50 shadow'
                        >
                            Next
                        </button>
                    </div>)
                }
            </section>
        </main>
    );
};