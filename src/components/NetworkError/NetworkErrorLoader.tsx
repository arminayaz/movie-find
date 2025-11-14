'use client';

import { useState } from 'react';
import Link from 'next/link';

export interface NetworkErrorProps {
    error?: Error;
    reset?: () => void;
    message?: string;
}

export const NetworkErrorLoader = ({error, reset}: NetworkErrorProps) => {
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

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-900 px-4'>
            <div className='max-w-lg w-full text-center'>
                <div className='mb-8'>
                    <svg
                        className='w-32 h-32 mx-auto text-green-500'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={1.5}
                            d='M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0'
                        />
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M12 12v.01'
                        />
                    </svg>
                </div>
                <h1 className='text-4xl font-bold text-gray-100 mb-4'>Network Connection Error</h1>
                <p className='text-xl text-gray-300 mb-4'>Unable to fetch resources</p>
                <p className='text-lg text-gray-400 mb-8'>{`We couldn't connect to the server. This might be due to network issues.`}</p>
                <div className='bg-gray-800 rounded-xl p-6 mb-8 text-left'>
                    <h3 className='text-lg font-semibold text-white mb-4'>Possible causes:</h3>
                    <ul className='space-y-3 text-gray-300'>
                        <li className='flex items-start gap-3'>
                            <svg className='w-5 h-5 mt-0.5 flex-shrink-0 text-green-500' fill='currentColor' viewBox='0 0 20 20'>
                                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                            </svg>
                            <span>Your internet connection is unstable or disconnected</span>
                        </li>
                        <li className='flex items-start gap-3'>
                            <svg className='w-5 h-5 mt-0.5 flex-shrink-0 text-green-500' fill='currentColor' viewBox='0 0 20 20'>
                                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                            </svg>
                            <span>The server is temporarily unavailable</span>
                        </li>
                        <li className='flex items-start gap-3'>
                            <svg className='w-5 h-5 mt-0.5 flex-shrink-0 text-green-500' fill='currentColor' viewBox='0 0 20 20'>
                                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                            </svg>
                            <span>Your firewall or network settings are blocking the connection</span>
                        </li>
                        <li className='flex items-start gap-3'>
                            <svg className='w-5 h-5 mt-0.5 flex-shrink-0 text-green-500' fill='currentColor' viewBox='0 0 20 20'>
                                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                            </svg>
                            <span>CORS or browser security policies are preventing the request</span>
                        </li>
                    </ul>
                </div>
                <div className='flex flex-col sm:flex-row gap-4 justify-center mb-6'>
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
                    <Link
                        href='/'
                        className='px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2'
                    >
                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' />
                        </svg>
                        Go Home
                    </Link>
                </div>
                <div className='flex justify-center text-sm text-gray-400'>
                    <div className='flex flex-col items-start'>
                        <p>Still having issues?</p>
                        <ul className='flex flex-col items-start mt-2 ml-2 space-y-1'>
                            <li>• Check your internet connection</li>
                            <li>• Try refreshing the page</li>
                            <li>• Clear your browser cache</li>
                            <li>• Disable any VPN or proxy</li>
                            <li>• Try a different browser</li>
                        </ul>
                    </div>
                </div>
                {error && process.env.NODE_ENV === 'development' && (
                    <details className='mt-8 text-left'>
                        <summary className='cursor-pointer text-sm text-gray-400 hover:text-gray-700'>
                            Technical Details (Development Only)
                        </summary>
                        <pre className='mt-4 p-4 bg-gray-800 text-gray-100 rounded-xl text-xs overflow-auto'>
                            {error.stack || error.message}
                        </pre>
                    </details>
                )}
            </div>
        </div>
    );
};