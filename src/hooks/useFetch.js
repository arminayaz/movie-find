import { useState, useEffect } from 'react';

export const useFetch = (apiPath, searchQuery='') => {
    const [data, setData] = useState([]);
    const url = `https://api.themoviedb.org/3/${apiPath}?language=en-US&page=1&query=${searchQuery}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
        }
    };
    
    useEffect(() => {
        async function fetchMovies(){
            const response = await fetch(url, options);
            const json = await response.json();
            setData(json.results);//results from api
        }
        fetchMovies();
    }, [url]);
    return {data};
}
