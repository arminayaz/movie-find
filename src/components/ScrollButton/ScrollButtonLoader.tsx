'use client';

import { useState, useEffect } from 'react';

export function ScrollButtonLoader() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {setIsVisible(window.scrollY > 300);};

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {window.scrollTo({top: 0, behavior: 'smooth'})};

    return (
        isVisible && 
            (<button
                onClick={scrollToTop}
                className='fixed md:bottom-15 md:right-10 bottom-15 right-5
                    p-3 rounded-xl 
                    bg-blue-600 text-white 
                    shadow-lg hover:bg-blue-700 
                    transition duration-300 
                    focus:outline-none
                    cursor-pointer'         
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-5 h-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                >
                    <path strokeLinecap='round' strokeLinejoin='round' d='m5 15 7-7 7 7' />
                </svg>
            </button>)
    );
}

