import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getLatestMovies } from "../api/tmdb-api"; 
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'; 

const LatestMoviesPage = () => {
    const { data, error, isLoading, isError } = useQuery("latest", getLatestMovies); 

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{`Error: ${error.message}`}</h1>;
    }
    // ensure thst movies is an array which has been defined.
    const movies = data?.results || []; 
    const mustWatch = movies.filter(m => m.mustWatch);


    localStorage.setItem('favorites', JSON.stringify(mustWatch));

    return (
        
        <PageTemplate
            title="Latest Movies" 
            movies={movies}
            action={movie => {
                return <AddToFavoritesIcon movie={ movie }/>
            }}
        />
    );
};

export default LatestMoviesPage;
