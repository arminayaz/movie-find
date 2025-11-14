import type { Movie } from '@/types/movie';
import type { FilterTemplateArguments, CreateFilterHandlerFunction } from '@/types/search';

export const dynamicDate = () => new Date().getFullYear();

export const formatMoney = (amount: number, currencyCode = 'USD', locale = 'en-US') => {
    if(!amount) return 'NA';
    else {
        const formater = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currencyCode,
            maximumFractionDigits: 0,
        });
        return formater.format(amount);
    }
};

export const formatReleaseYears = (movie: Movie) => movie.release_date.slice(0, 4) || '';

export const formatTime = (totalMinutes: number) => {
    if(totalMinutes < 60) return totalMinutes + 'm';
    else {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return hours + 'h ' + minutes + 'm';
    }
}

export const formatReview = (dig: number) => dig && (Math.floor(dig * 10) / 10)

export const clampText = (elm: string, maxChars: number) => {
    if(!elm) return '';
    return elm.length > maxChars ? elm.slice(0, maxChars).trimEnd() + '...' : elm;
}

export const filterTemplate: FilterTemplateArguments = (name, value, onChange, options) => (
    <select
        key={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className='px-4 py-2 border border-gray-300 rounded-xl dark:bg-gray-700 dark:text-white'
    >
        {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
                {opt.label}
            </option>
        ))}
    </select>
);

export const createFilterHandler: CreateFilterHandlerFunction = (setFilters) => (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
};