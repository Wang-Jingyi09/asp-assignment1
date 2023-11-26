import React from "react";
import { useQuery } from "react-query";
import { getTrendingMovies } from "../api/tmdb-api";
import MovieListPageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import AddToMustWatch from "../components/cardIcons/addToMustWatch";

const TrendingMoviesPage = () => {
  const { data, isLoading, isError, error } = useQuery('trendingMovies', getTrendingMovies, {
    staleTime: 24 * 60 * 60 * 1000,
    keepPreviousData: true
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{`Error: ${error.message}`}</h1>;
  }
  const movies = data?.results || [];
  const mustWatch = movies.filter(m => m.mustWatch);

  const action = (movie) => {
    return (
      <>
        <AddToFavoritesIcon movie={movie} />
        <AddToMustWatch movie={movie} />
      </>
    );
  };
  localStorage.setItem('favorites', JSON.stringify(mustWatch));
  return (
    <MovieListPageTemplate
      title="Trending Movies Today"
      movies={movies}
      action={action}
    />
  );
};

export default TrendingMoviesPage;
