import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);
  const [releaseYear, setReleaseYear] = useState('');
  const [selectedRating, setSelectedRating] = useState('');

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      if (releaseYear) {
        const movieYear = new Date(m.release_date).getFullYear();
        return movieYear.toString() === releaseYear;
      }
      return true;
    })
    .filter((m) => {
      if (selectedRating) {
        switch (selectedRating) {
          case "9+": return m.vote_average >= 9;
          case "8-9": return m.vote_average >= 8 && m.vote_average < 9;
          case "7-8": return m.vote_average >= 7 && m.vote_average < 8;
          case "<7": return m.vote_average < 7;
          default: return true;
        }
      }
      return true;
    });


  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "year") setReleaseYear(value);
    else if (type === "rating") setSelectedRating(value);
  };

  return (
    <Grid container sx={{ padding: '20px' }}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            yearFilter={releaseYear}
            ratingFilter={selectedRating}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;