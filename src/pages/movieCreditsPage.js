import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getMovieCredits } from '../api/tmdb-api';
import PageTemplate from "../components/templateMoviePage";
import Spinner from '../components/spinner';
import MovieDetails from "../components/movieDetails";


const MovieCreditsPage = () => {
  const { id } = useParams();
  
  const { data: credits, isLoading, isError, error } = useQuery(
    ['movieCredits', { id }],
    getMovieCredits
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {credits ? (
        <>
          <PageTemplate >
            <MovieDetails credits={credits} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie credits</p>
      )}
    </>
  );
};

export default MovieCreditsPage;
