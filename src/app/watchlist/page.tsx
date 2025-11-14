import { Metadata } from 'next';
import Watchlist from '@/components/Watchlist';

export const metadata: Metadata = {
    title: 'Watchlist',
    description: 'Here are all the movies that you added to your watchlist',
};

export default function WatchlistPage() {
    return <Watchlist />;
};
