'use client';

import { useMounted } from '@/hooks/useMounted';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const MovieCardSkeleton = () => {
    const mounted = useMounted();

    return (
        <div className='flex flex-col items-stretch w-full h-[975px] md:h-[1050px] min-w-2xs bg-white dark:bg-gray-800 border-transparent rounded-xl shadow'>
            <SkeletonTheme baseColor='var(--skeleton-base)' highlightColor='var(--skeleton-highlight)'>
                <div className='aspect-[2/3] md:h-[590px] w-full'>{mounted && (<Skeleton height={590} style={{lineHeight: 'unset', borderTopLeftRadius: '.75rem', borderTopRightRadius: '.75rem', borderBottomLeftRadius: 'unset', borderBottomRightRadius: 'unset'}}/>)}</div>
                <div className='flex flex-col h-full grow-2 p-5'>
                    <div className='mb-3 md:h-[150px]'>{mounted && (<Skeleton count={2}/>)}</div>
                    <div className='h-full mb-3'>{mounted && (<Skeleton count={8} height={10} />)}</div>
                    <div>{mounted && (<Skeleton className='px-4 py-2' width='100%' height={40} style={{borderRadius: '.75rem'}}/>)}</div>
                </div>
            </SkeletonTheme>
        </div>
    );
};
