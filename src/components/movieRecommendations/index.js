import React from 'react';
import { useQuery } from 'react-query';
import { getMovieRecommendations } from '../../api/tmdb-api';
import Spinner from '../spinner';
import MovieList from '../movieList';

const MovieRecommendations = ({ id }) => {
    const { data, isLoading, isError, error } = useQuery(
        ['movieRecommendations', id],
        () => getMovieRecommendations(id),
        {
            staleTime: 5 * 60 * 1000,
        }
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{`Error: ${error.message}`}</h1>;
    }

    const recommendations = data.results;

    return (
        <>
            <h2>Recommendations</h2>
            <MovieList movies={recommendations} />
        </>
    );
};

export default MovieRecommendations;
