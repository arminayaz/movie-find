'use client';

import { useState, useEffect, useMemo } from 'react';
import MovieCard from '@/components/MovieCard';
import { formatReleaseYears, filterTemplate, createFilterHandler } from '@/lib/helperFunctions';
import type { SearchMovie } from '@/types/movie';
import type { FilterOptions, FilterOptionsList } from '@/types/search';

export interface SearchPageClientProps {
    initialMovies: SearchMovie[];
    searchQuery: string;
}

export const SearchLoader = ({initialMovies, searchQuery}: SearchPageClientProps) => {
    const [movies, setMovies] = useState(initialMovies);
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({genre: '', year: '', rating: '', order: 'desc',});
    const handleFilterChange = createFilterHandler(setFilterOptions);
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 6;
    const intersectionThreshold = 0.4;

    useEffect(
        () => {setMovies(initialMovies); setCurrentPage(1);}, 
        [filterOptions.genre, filterOptions.year, filterOptions.rating, filterOptions.order, initialMovies, searchQuery]
    );
    
    const filteredMovies = useMemo(() => {
        return movies.filter((movie) => {
            const matchGenre = filterOptions.genre ? Array.isArray(movie.genre_ids) && movie.genre_ids.includes(Number(filterOptions.genre)) : true;
            const matchDecade = filterOptions.year ? (movie.release_date ? Number(formatReleaseYears(movie)) : 0) >= Number(filterOptions.year) : true;
            const matchRating = filterOptions.rating ? movie.vote_average >= Number(filterOptions.rating) : true;
            return matchGenre && matchDecade && matchRating;
        });
    }, [movies, filterOptions]);
    
    const sortedMovies = useMemo(() => {
        const filterdList = [...filteredMovies];
        return filterdList.sort((first, last) => {
            const firstYear = first.release_date ? Number(formatReleaseYears(first)) : 0;
            const lastYear = last.release_date ? Number(formatReleaseYears(last)) : 0;
            return filterOptions.order === 'desc' ? lastYear - firstYear : firstYear - lastYear;
        });
    }, [filteredMovies, filterOptions.order]);

    const filterOptionsList: FilterOptionsList = {
        genre: [
            {label: 'All Genres', value: ''},
            {label: 'Action', value: '28'},
            {label: 'Adventure', value: '12'},
            {label: 'Animation', value: '16'},
            {label: 'Comedy', value: '35'},
            {label: 'Crime', value: '80'},
            {label: 'Documentary', value: '99'},
            {label: 'Drama', value: '18'},
            {label: 'Family', value: '10751'},
            {label: 'Fantasy', value: '14'},
            {label: 'History', value: '36'},
            {label: 'Horror', value: '27'},
            {label: 'Music', value: '10402'},
            {label: 'Mystery', value: '9648'},
            {label: 'Romance', value: '10749'},
            {label: 'Science Fiction', value: '878'},
            {label: 'Thriller', value: '53'},
        ],
        year: [
            {label: 'All Years', value: ''},
            {label: '1980s', value: '1980'},
            {label: '1990s', value: '1990'},
            {label: '2000s', value: '2000'},
            {label: '2010s', value: '2010'},
            {label: '2020s', value: '2020'},
        ],
        rating: [
            {label: 'All Ratings', value: ''},
            {label: '+5', value: '5'},
            {label: '+6', value: '6'},
            {label: '+7', value: '7'},
            {label: '+8', value: '8'},
            {label: '+9', value: '9'},
        ],
        order: [
            {label: 'Latest', value: 'desc'},
            {label: 'Oldest', value: 'asc'},
        ],
    };
    
    const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
    const startIndex = (currentPage - 1) * moviesPerPage;
    const paginatedMovies = useMemo(() => {
        return sortedMovies.slice(startIndex, startIndex + moviesPerPage);
    }, [sortedMovies, startIndex]);
    
    const handlePageChange = (generatePage: number) => {
        if(generatePage >= 1 && generatePage <= totalPages) {
            setCurrentPage(generatePage);
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
    };

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

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
        <main>
            <section className='py-7'>
                {searchQuery && (<p className='text-3xl text-gray-700 dark:text-white text-center'>{movies.length === 0 ? `Nothing found related to '${searchQuery}'` : `Results for '${searchQuery}'`}</p>)}
                {searchQuery && sortedMovies.length > 0 && 
                    (<p className='text-center text-gray-600 dark:text-gray-400 mt-6'>
                        Showing {startIndex + 1}-{Math.min(startIndex + moviesPerPage, sortedMovies.length)} of {sortedMovies.length} {sortedMovies.length === 1 ? 'movie' : 'movies'}
                    </p>)
                }
            </section>
            {searchQuery && movies.length > 0 && (
                <section className='max-w-7xl mx-auto py-7 flex 2xs:max-sm:flex-col gap-4 flex-wrap justify-center'>
                    {(Object.keys(filterOptionsList) as Array<keyof FilterOptionsList>).map((key) =>
                        filterTemplate(key, filterOptions[key], handleFilterChange, filterOptionsList[key])
                    )} 
                    <button
                        onClick={() => {setFilterOptions({genre: '', year: '', rating: '', order: 'desc',})}}
                        className='px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700'
                    >
                        Reset Filters
                    </button>
                </section>
            )}
            {searchQuery && movies.length > 0 && (
                <>
                    <section className='max-w-7xl lg:max-w-7xl mx-auto py-7'>
                        <div className='grid sm:grid-cols-2 sm:landscape:grid-cols-2 grid-cols-1 landscape:grid-cols-3 lg:grid-cols-3 lg:landscape:grid-cols-3 gap-5 md:gap-6'>
                            {paginatedMovies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} thresholdConfig={intersectionThreshold} variant={'default'} watchlistskeleton={undefined}/>
                            ))}
                        </div>
                    </section>
                    {paginatedMovies.length > 0 && totalPages > 1 && (
                        <section className='flex justify-center items-center space-x-4 py-5'>
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
                        </section>
                    )}
                </>
            )}
            {searchQuery && movies.length > 0 && filteredMovies.length === 0 && (
                <section className='max-w-7xl mx-auto py-7'>
                    <p className='text-gray-700 dark:text-white mt-4 text-2xl text-center'>No results match your filter combination</p>
                </section>
            )}
        </main>
    );
}