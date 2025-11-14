import Link from 'next/link';
import { cookies, headers } from 'next/headers';
import { HeaderClient } from './HeaderClient';

const navLinks = [
    {href: '/', label: 'Home'},
    {href: '/movies/popular', label: 'Popular'},
    {href: '/movies/top', label: 'Top Rated'},
    {href: '/movies/upcoming', label: 'Upcoming'},
    {href: '/watchlist', label: 'Watchlist'},
];
const activeClass = 'text-base block py-2 pl-3 pr-4 text-white rounded-xl bg-blue-600 lg:bg-transparent lg:text-blue-700 lg:p-0 dark:text-white text-center';
const inActiveClass = 'text-base block py-2 pr-4 pl-3 text-gray-700 rounded-xl md:hover:bg-transparent lg:hover:text-gray-500 lg:p-0 lg:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white text-center md:dark:hover:bg-transparent dark:border-gray-700';


export async function HeaderServer() {
    const cookieStore = await cookies();
    const initialTheme = cookieStore.get('theme')?.value as 'light' | 'dark' || 'light';
    const headerStore = await headers(); 
    const pathname = headerStore.get('x-pathname') || '/';

    return (
        <header>
            <nav className='bg-gray-100 border-b-2 border-gray-200 dark:bg-gray-900 dark:border-b-2 dark:border-gray-900 py-4 px-2 md:px-6 2xs:max-sm:px-5'>
                <div className='max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto'>
                    <Link href='/' className='flex items-center rtl:space-x-reverse'>
                        <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white other:ml-2'>Movie Find</span>
                    </Link>
                    <HeaderClient 
                        navLinks={navLinks} 
                        pathname={pathname}
                        activeClass={activeClass}
                        inActiveClass={inActiveClass}
                        initialTheme={initialTheme}
                    />
                </div>
            </nav>
        </header>
    );
}