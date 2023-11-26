export const filterByTitle = (movieList, string) =>
  movieList.filter((m) => m.title.toLowerCase().search(string) !== -1);

export const filterByGenre = (movieList, genreId) =>
  movieList.filter((m) => m.genre_ids.includes(genreId));

export const filterByYear = (movieList, year) =>
  movieList.filter((m) => {
    const movieYear = new Date(m.release_date).getFullYear();
    return movieYear.toString() === year;
  });

export const filterByRating = (movieList, rating) => {
  let filteredMovies = [];
  switch (rating) {
    case '9+':
      filteredMovies = movieList.filter((m) => m.vote_average >= 9);
      break;
    case '8-9':
      filteredMovies = movieList.filter((m) => m.vote_average >= 8 && m.vote_average < 9);
      break;
    case '7-8':
      filteredMovies = movieList.filter((m) => m.vote_average >= 7 && m.vote_average < 8);
      break;
    case '<7':
      filteredMovies = movieList.filter((m) => m.vote_average < 7);
      break;
    default:
      filteredMovies = movieList;
  }
  return filteredMovies;
};

