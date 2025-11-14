import { NextRequest, NextResponse } from 'next/server';
import { getMovieById } from '@/lib/tmdb';

type ParamsType = {id: string};
interface CustomError extends Error {status?: number}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(request: NextRequest, context: any) {
    const {id} = context.params as ParamsType;
    if(!id) return NextResponse.json({error: 'Movie ID is required'}, {status: 400});

    try {
        const movie = await getMovieById(id);
        if(!movie) return NextResponse.json({error: 'Movie not found'}, {status: 404});
        return NextResponse.json(movie, {status: 200});    
    }
    catch(err: unknown) {
        const error = err as CustomError;
        if(error?.status === 404) return NextResponse.json({error: 'Movie not found'}, {status: 404});
        console.error('TMDB API Error:', error);
        return NextResponse.json({error: 'Internal server error'}, {status: 500});
    }
}
