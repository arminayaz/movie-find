'use client';

import { useEffect, useState } from 'react';
import { MovieDetailClient } from './MovieDetailClient';
import { MovieDetailSkeleton } from './MovieDetailSkeleton';
import type { Movie } from '@/types/movie';
import type { Video } from '@/types/video';

export function MovieDetailLoader({movie}: {movie: Movie}) {
    const [ready, setReady] = useState(false);
    const MIN_SKELETON_MS = 600;

    useEffect(() => {
        let mounted = true;
        let minTimer: ReturnType<typeof setTimeout> | null = null;

        const posterUrl = movie?.poster_path? `https://image.tmdb.org/t/p/original${movie.poster_path}` : null;

        
        const trailerKeys = movie?.videos?.results?.map((v: Video) => v.key) || [];
        const thumbUrls = trailerKeys.map((k: string) => `https://img.youtube.com/vi/${k}/hqdefault.jpg`);

        const preloadImage = (src: string) =>
            new Promise<void>((resolve) => {
                if(!src) return resolve();
                const img = new Image();
                img.onload = () => resolve();
                img.onerror = () => resolve();
                img.src = src;
            });

        const start = async () => {
            const preloadPromises: Promise<void>[] = [];

            if(posterUrl) preloadPromises.push(preloadImage(posterUrl));
            for(const url of thumbUrls) preloadPromises.push(preloadImage(url));

            const minDelayPromise = new Promise<void>((resolve) => {
                minTimer = setTimeout(() => resolve(), MIN_SKELETON_MS);
            });

            await Promise.all([Promise.allSettled(preloadPromises), minDelayPromise]);

            if(mounted) setReady(true);
        };

        start();

        return () => {mounted = false; if(minTimer) clearTimeout(minTimer)};
    }, [movie]);

    if(!ready) return <MovieDetailSkeleton />;

    return <MovieDetailClient movie={movie} />;
}