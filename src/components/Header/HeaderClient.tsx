'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import { ThemeToggle } from './ThemeToggle';
import Icons from '@/components/Icons';

interface NavLink {href: string; label: string;}

interface SearchResult {id: number; title: string; release_date: string;}

interface HeaderClientProps {
    navLinks: NavLink[];
    pathname: string;
    activeClass: string;
    inActiveClass: string;
    initialTheme: 'light' | 'dark';
}

export function HeaderClient({navLinks, pathname: _serverPathname, activeClass, inActiveClass, initialTheme}: HeaderClientProps) {
    const [hidden, setHidden] = useState(true);
    const pathname = usePathname(); 
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const debouncedSearch = useDebounce(searchTerm, 0);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchResults = async () => {
            if(!debouncedSearch || debouncedSearch.length < 2) {setSearchResults([]); return;}
            
            const response = await fetch(`/api/search?q=${debouncedSearch}`);
            const data = await response.json();

            setSearchResults(data.results || []);
            setShowDropdown(true);
        };
        fetchResults();
    }, [debouncedSearch]);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setShowDropdown(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if(!searchTerm.trim()) return;
        setShowDropdown(false);
        router.push(`/search?q=${searchTerm}`);
        setSearchTerm('');
    };
    
    return (
        <>
            <div className='flex lg:order-2'>
                <ThemeToggle initialTheme={initialTheme} />
                <div ref={dropdownRef} className='relative hidden lg:block'>
                    <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                        <Icons name='search' className='w-5 h-5 text-gray-500 dark:text-gray-400'/>
                        <span className='sr-only'>Search icon</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type='search'
                            id='search-navbar-main' 
                            name='search'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            placeholder='Search Movies...'
                        />
                    </form>
                    {showDropdown && searchResults.length > 0 && (
                        <div className='absolute left-0 right-0 z-50 mt-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 rounded-xl overflow-hidden dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                            <div className='relative left-0 right-0 overflow-y-auto max-h-64 rounded-xl'>
                                {searchResults.map((movie) => (
                                    <Link 
                                        key={movie.id} 
                                        href={`/movie/${movie.id}`} 
                                        onClick={() => {setSearchTerm(''); setShowDropdown(false);}}
                                        className='block px-4 py-2 text-gray-800 dark:text-white cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl'
                                    >
                                        {movie.title} {movie.release_date ? `(${movie.release_date.slice(0, 4)})` : ''}
                                    </Link>
                                ))}
                                <Link
                                    href={`/search?q=${searchTerm}`} 
                                    className='block px-4 py-2 text-blue-600 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl'
                                >
                                    See All Results
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
                <button onClick={() => setHidden(!hidden)} data-collapse-toggle='navbar-menu' type='button' className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-xl lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600' aria-controls='navbar-search' aria-expanded='false'>
                    <span className='sr-only'>Open Main Menu</span>
                    <Icons name='burger' className='w-5 h-5 flex items-center justify-center'/>
                </button>
            </div>
            <div className={`items-center justify-between ${hidden ? 'hidden' : ''} w-full lg:flex lg:w-auto lg:order-1`} id='navbar-search'>
                <div className='relative mt-4 lg:hidden'>
                    <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                        <Icons name='search' className='w-5 h-5 text-gray-500 dark:text-gray-400'/>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type='text' 
                            id='search-navbar' 
                            name='search'
                            value={searchTerm} 
                            className='block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            placeholder='Search...'
                            autoComplete='off'
                            onChange={(e) => {setSearchTerm(e.target.value); setShowDropdown(true);}}
                            onFocus={() => setShowDropdown(true)}
                        />
                    </form>
                </div>
                <ul className='flex flex-col p-4 lg:p-0 mt-4 font-medium text-gray-900 border border-gray-100 rounded-xl bg-gray-50 lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 lg:bg-gray-100 dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700' suppressHydrationWarning>
                    {navLinks.map(({href, label}) => 
                        (<li key={href}><Link href={href} className={pathname === href ? activeClass : inActiveClass} suppressHydrationWarning>{label}</Link></li>)
                    )}
                </ul>
            </div>
        </>
    );
}