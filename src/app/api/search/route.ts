import { NextRequest, NextResponse } from 'next/server';

const TMDB_API_BASE = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;

export async function GET(request: NextRequest) {
    if(!TMDB_API_KEY) return NextResponse.json({error: 'API Key not configured'}, {status: 500});
    
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if(!query || query.trim().length < 2) return NextResponse.json({results: []});

    const searchUrl = `${TMDB_API_BASE}/search/movie?language=en-US&page=1&query=${encodeURIComponent(query)}`;
    const response = await fetch(searchUrl, {
            headers: {accept: 'application/json', Authorization: `Bearer ${TMDB_API_KEY}`},
            next: {revalidate: 60},
        }
    );

    if(!response.ok) throw new Error('Failed to fetch search results');

    const data = await response.json();

    return NextResponse.json({results: data.results?.slice(0, 6) || [],});
}