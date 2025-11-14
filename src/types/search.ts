export interface Movie {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string;
    release_date?: string | null;
    vote_average: number;
    genre_ids?: number[];
}

export interface FilterOptions {
    genre: string;
    year: string;
    rating: string;
    order: string;
}

export interface FilterOptionsItem {
    label: string; 
    value: string;
}

export interface FilterOptionsList {
    genre: FilterOptionsItem[];
    year: FilterOptionsItem[];
    rating: FilterOptionsItem[];
    order: FilterOptionsItem[];
}

export type FilterChangeHandler = (key: keyof FilterOptions, value: string) => void;

export type FilterTemplateArguments = (
    name: keyof FilterOptionsList, 
    value: string, 
    onChange: FilterChangeHandler, 
    options: FilterOptionsItem[] 
) => React.ReactNode;

export type CreateFilterHandlerFunction = (
    setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>
) => FilterChangeHandler;