'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import Icons from '@/components/Icons';

type Theme = 'light' | 'dark';

export function ThemeToggle({initialTheme}: {initialTheme: Theme}) {
    const {setTheme, resolvedTheme} = useTheme();
    const [iconTheme, setIconTheme] = useState(initialTheme); 

    useEffect(() => {
        if(resolvedTheme) {
            setIconTheme(resolvedTheme as Theme);
            document.cookie = `theme=${resolvedTheme};path=/;max-age=31536000`;
        }
    }, [resolvedTheme]); 

    const toggleTheme = () => {
        const current = resolvedTheme === 'dark' ? 'dark' : 'light';
        const nextTheme = current === 'dark' ? 'light' : 'dark';
        
        setTheme(nextTheme);
        setIconTheme(nextTheme);

        document.cookie = `theme=${nextTheme};path=/;max-age=31536000`;
    };

    return (
        <button
            onClick={toggleTheme}
            id='theme-toggle'
            suppressHydrationWarning
            className='text-gray-500 dark:text-gray-400 border border-gray-300 dark:border dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-xl text-sm p-2 mr-2'
        >
            {iconTheme === 'dark' ? 
                (<Icons name='sun' className='w-5 h-5'/>) 
                : 
                (<Icons name='moon' className='w-5 h-5' />)
            }
        </button>
    );
}