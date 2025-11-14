import Link from 'next/link';
import { dynamicDate } from '@/lib/helperFunctions';

export function FooterClient() {
    const footerLinks = [
        {href: 'https://www.linkedin.com/in/shubhamsarda/', title: 'Shubham Sarda'},
        {href: 'https://www.linkedin.com/in/armin-ayaz/', title: 'Armin Ayaz'}
    ];
    
    return (
        <footer className='bg-gray-100 shadow dark:bg-gray-900 p-2 border-t-2 border-gray-200 dark:border-t-2 dark:border-gray-900'>
            <div className='w-full mx-auto max-w-screen-2xl py-4 px-2 md:px-6 md:flex md:items-center md:justify-between'>
                <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>© {dynamicDate()} <Link href='/' className='hover:underline'>Movie Find™</Link>. All Rights Reserved.</span>
                <div className='flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0 other:justify-center'>
                    <div className='ml-0 md:ml-6'>
                        <span>Developed by <Link href={footerLinks[0].href} className='cursor-pointer underline' target='_blank'>{footerLinks[0].title}</Link></span>
                        <span> / </span> 
                        <span>Enhanced and refined by <Link href={footerLinks[1].href} className='cursor-pointer underline' target='_blank'>{footerLinks[1].title}</Link></span>
                     </div>
                </div>
            </div>
        </footer>
    );
}
