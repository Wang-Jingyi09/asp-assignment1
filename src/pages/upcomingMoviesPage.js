import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import AddToMustWatchIcon from '../components/cardIcons/addToMustWatch';
import Pagination from '@mui/material/Pagination';

const UpcomingMoviesPage = () => {
    const [page, setPage] = useState(1);

    const { data, error, isLoading, isError } = useQuery(["upcoming", page], () => getUpcomingMovies(page));

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{`Error: ${error.message}`}</h1>;
    }

    const movies = data.results;
    const total_pages = data.total_pages;
    const mustWatch = movies.filter(m => m.mustWatch)

    localStorage.setItem('favorites', JSON.stringify(mustWatch))

    return (
        <>
            <PageTemplate
                title="Upcoming Movies"
                movies={movies}
                action={movie => <AddToMustWatchIcon movie={movie} />}
            />
            <Pagination
                count={total_pages}
                page={page}
                onChange={(event, newPage) => setPage(newPage)}
            />
        </>
    );
};

export default UpcomingMoviesPage;
