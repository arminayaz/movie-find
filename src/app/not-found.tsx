import Link from 'next/link';
import Image from 'next/image';

export const metadata = {title: 'Page Not Found - Movie Find'};

export default function NotFound() {
    return (
        <main>
            <section className='flex flex-col justify-center px-2'>
                <div className='flex flex-col items-center my-4'>
                    <p className='text-4xl md:text-7xl text-gray-700 font-bold my-10 dark:text-white'>Page not found!</p>
                    <div className='max-w-lg'>
                        <Image className='rounded-xl' src='/stuff/img/not-found.png' width={512} height={341} alt='404 Page Not Found' />
                    </div>
                </div>
                <div className='flex justify-center my-4'>
                    <Link className='w-64 border border-transparent rounded-xl' href='/'>
                        <button className='w-full cursor-pointer rounded-xl text-xl bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 font-medium text-white'>Head back Home</button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
