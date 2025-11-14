'use client';

import { useMounted } from '@/hooks/useMounted';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const boxFix = {
        lineHeight: 'unset',
        border: '2px',
        borderTopLeftRadius: 'var(--radius-xl)',
        borderTopRightRadius: 'var(--radius-xl)',
        borderBottomLeftRadius: 'var(--radius-xl)',
        borderBottomRightRadius: 'var(--radius-xl)'
};
const imgFix = {
        lineHeight: 'unset',
        height: '100%',
        border: '2px',
        borderTopLeftRadius: 'var(--radius-xl)',
        borderTopRightRadius: 'var(--radius-xl)',
        borderBottomLeftRadius: 'unset',
        borderBottomRightRadius: 'unset'
};

export const WatchlistSkeleton = () => {
    const mounted = useMounted();
    return (
        <div className='flex flex-col items-stretch lg:w-[240px] xl:w-[185px] xl:h-[full] lg:h-[490px] bg-white dark:bg-gray-800 border-transparent rounded-xl shadow'>
            <SkeletonTheme baseColor='var(--skeleton-base)' highlightColor='var(--skeleton-highlight)'>
                <div className='aspect-[2/3] w-full xl:h-[full] lg:h-[290px]'>{mounted && (<Skeleton style={imgFix}/>)}</div>
                <div className='flex flex-col items-center justify-center h-full grow-2 p-5 gap-5'>
                    <div className='h-[100px]'>{mounted && (<Skeleton width={100} height={10} count={2}/>)}</div>
                    <div>{mounted && (<Skeleton className='px-4 py-2 rounded-xl' style={boxFix} width='55px' height={32} />)}</div>
                </div>
            </SkeletonTheme>
        </div>
    );
};
