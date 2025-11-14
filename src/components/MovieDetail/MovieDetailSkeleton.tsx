import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const lineHeightZero = {lineHeight: '0'};
const lineHeightUnset = {lineHeight: 'unset'};

const boxFix = {
        lineHeightUnset,
        border: '2px',
        borderTopLeftRadius: 'var(--radius-xl)',
        borderTopRightRadius: 'var(--radius-xl)',
        borderBottomLeftRadius: 'var(--radius-xl)',
        borderBottomRightRadius: 'var(--radius-xl)'
};

export const MovieDetailSkeleton = () => {
    return (
        <SkeletonTheme baseColor='var(--skeleton-base)' highlightColor='var(--skeleton-highlight)' inline={true}>
            <div className='animate-fade-in flex flex-col md:flex-row justify-center xl:justify-between items-start flex-wrap w-full gap-20'>
                <div className='max-w-sm flex-grow w-full h-[unset] h-[575px] overflow-y-auto rounded-xl self-center'>
                    <Skeleton style={{display: 'flex'}} className='rounded-xl w-[384px] h-[575px]' />
                </div>
                <div className='xl:max-w-3xl max-w-7xl w-full'>
                    <div className='my-3' style={lineHeightZero}><Skeleton count={1} height={40} /></div>
                    <div className='my-4 h-[112px]'><Skeleton style={{lineHeight: 'unset', marginBottom: '4px'}} count={4} height={25} /></div>
                    <div className='flex gap-2 my-7 w-[252px] h-[40px]' style={lineHeightZero}>
                        <div className='w-full h-full mr-2'><Skeleton height='100%' style={boxFix} /></div>
                        <div className='w-full h-full mr-2'><Skeleton height='100%' style={boxFix} /></div>
                        <div className='w-full h-full'><Skeleton height='100%' style={boxFix} /></div>
                    </div>
                    {Array(6).fill(0).map((_, idx) => (
                        <div key={idx} className='my-4' style={lineHeightZero}>
                            <div className='mr-2 w-[252px] h-[28px]'><Skeleton height='26px' /></div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='animate-fade-in flex flex-col justify-around flex-wrap w-full h-full gap-5'>
                <h2 className='w-[100px]' style={lineHeightZero}><Skeleton height='36px' /></h2>
                <div className='md:h-[55vw] xl:landscape:h-[36.54vw] h-[55vw] w-full' style={lineHeightZero}><Skeleton style={boxFix} height='100%' width='100%'/></div>
                <div className='flex gap-8 h-full w-full' style={lineHeightZero}>
                    <div className='mt-2.5 rounded-xl w-[393.333px] h-[105px] md:h-[250px]'><Skeleton style={boxFix} height='100%' /></div>
                    <div className='mt-2.5 rounded-xl w-[393.333px] h-[105px] md:h-[250px]'><Skeleton style={boxFix} height='100%' /></div>
                </div>
            </div>
        </SkeletonTheme>
    );
};
