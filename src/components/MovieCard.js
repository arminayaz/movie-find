import { Link } from 'react-router-dom';

export const MovieCard = ({movie}) => {
    const {id, original_title, overview, poster_path} = movie;
    const image_url = poster_path ? `https://image.tmdb.org/t/p/original${poster_path}` : 'https://picsum.photos/1500/2250';
    
    return (
        <div className="max-w-sm min-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-3">
            <Link to={`/movie/${id}`}>
                <img className="rounded-t-lg" src={image_url} alt="" />
            </Link>
            <div className="p-5">
                <Link to={`/movie/${id}`}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{original_title}</h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{movie.overview}</p>
            </div>
        </div>
    );
}
