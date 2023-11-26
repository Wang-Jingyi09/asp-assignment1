import React, {useState} from "react";
import { useQuery } from "react-query";
import { getTopRatedMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const TopRatedMoviesPage = () => {
    const [page] = useState(1);
    const { data, isLoading, isError, error } = useQuery(['topRatedMovies', page], () => getTopRatedMovies(page));

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{`Error: ${error.message}`}</h1>;
    }
    const movies = data?.results || [];
    const mustWatch = movies.filter(m => m.mustWatch);


    localStorage.setItem('favorites', JSON.stringify(mustWatch));
    return (
        <PageTemplate
            title="Top Rated Movies"
            movies={movies}
            action={movie => {
                return <AddToFavoritesIcon movie={movie} />
            }}
        />
    );
};

export default TopRatedMoviesPage;
