'use client';

import { useState, useEffect } from 'react';
import NetworkError  from '@/components/NetworkError';
import localFont from 'next/font/local';
import './globals.css';

const notoSans = localFont({
    src: [
        {path: '../stuff/fonts/NotoSans-Light.woff2', weight: '300', style: 'normal'},
        {path: '../stuff/fonts/NotoSans-Regular.woff2', weight: '400', style: 'normal'},
        {path: '../stuff/fonts/NotoSans-SemiBold.woff2', weight: '600', style: 'normal'},
        {path: '../stuff/fonts/NotoSans-Bold.woff2', weight: '700', style: 'normal'},
        {path: '../stuff/fonts/NotoSans-ExtraBold.woff2', weight: '800', style: 'normal'}
    ],
    variable: '--font-noto-sans',
    display: 'swap',
    fallback: ['system-ui', 'sans-serif'],
    preload: false,
});

export default function GlobalError({error, reset,}: {error: Error & {digest?: string}; reset: () => void;}) {
    useEffect(() => {console.error('Error:', error)}, [error]);
    const [isRetrying, setIsRetrying] = useState(false);

    const handleRetry = async () => {
        setIsRetrying(true);

        if(typeof window !== 'undefined' && !navigator.onLine) {
            alert('You are still offline. Please check your internet connection.');
            setIsRetrying(false);
            return;
        }

        await new Promise(resolve => setTimeout(resolve, 500));

        if(reset) reset(); 
        else window.location.reload();

        setIsRetrying(false);
    };
    
    const isNetworkError = 
        error.message.includes('fetch') ||
        error.message.includes('network') ||
        error.message.includes('NetworkError') ||
        error.message.includes('Failed to fetch') ||
        error.message.includes('Load failed') ||
        error.name === 'TypeError';

    if(isNetworkError) return <NetworkError error={error} reset={reset} />;

    return (
        <html className={`${notoSans.variable}`}>
            <body>
                <div className='min-h-screen flex items-center justify-center bg-gray-900 px-4'>
                    <div className='max-w-md w-full text-center'>
                        <div className='mb-8'>
                            <svg
                                className='w-24 h-24 mx-auto text-red-500'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                                />
                            </svg>
                        </div>
                        <h1 className='text-4xl font-bold text-white mb-4'>
                            Critical Error
                        </h1>
                        <p className='text-lg text-gray-400 mb-8'>
                            Something went seriously wrong. Please refresh the page.
                        </p>
                        <div className='flex items-center justify-center'>
                            <button
                                onClick={handleRetry}
                                disabled={isRetrying}
                                className='px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                            >
                                {isRetrying ? 
                                    (<>
                                        <svg className='animate-spin h-5 w-5' viewBox='0 0 24 24'>
                                            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' fill='none' />
                                            <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z' />
                                        </svg>
                                        Retrying...
                                    </>)
                                    : 
                                    (<>
                                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
                                        </svg>
                                        Try Again
                                    </>)
                                }
                            </button>
                        </div>
                        {error.digest && (
                            <p className='mt-8 text-sm text-gray-400'>
                                Error ID: {error.digest}
                            </p>
                        )}
                        {process.env.NODE_ENV === 'development' && (
                            <details className='mt-8 text-left'>
                                <summary className='cursor-pointer text-sm text-gray-400'>
                                    Error Details (Dev Only)
                                </summary>
                                <pre className='mt-4 p-4 bg-gray-800 text-gray-100 rounded-xl text-xs overflow-auto'>
                                    {error.stack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            </body>
        </html>
    );
}