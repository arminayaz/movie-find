import { SearchLoader } from './SearchLoader';
import type { SearchPageClientProps } from './SearchLoader';

export default function SearchPageClient({initialMovies, searchQuery}: SearchPageClientProps) {
    return <SearchLoader initialMovies={initialMovies} searchQuery={searchQuery} />;
}