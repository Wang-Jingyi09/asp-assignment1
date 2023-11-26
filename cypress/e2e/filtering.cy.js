/* eslint-disable no-undef */
import { filterByTitle, filterByGenre, filterByYear, filterByRating } from "../support/e2e";
let movies; // List of Discover movies from TMDB

describe("Filtering", () => {
    before(() => {
        // Get movies from TMDB and store them locally.
        cy.request(
            `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
                "TMDB_KEY"
            )}&language=en-US&include_adult=false&include_video=false&page=1`
        )
            .its("body")
            .then((response) => {
                movies = response.results;
            });
    });
    beforeEach(() => {
        cy.visit("/");
    });

    describe("By movie title", () => {
        it("only display movies with 'm' in the title", () => {
            const searchString = "m";
            const matchingMovies = filterByTitle(movies, searchString);
            cy.get("#filled-search").clear().type(searchString); // Enter m in text box
            cy.get(".MuiCardHeader-content").should(
                "have.length",
                matchingMovies.length
            );
            cy.get(".MuiCardHeader-content").each(($card, index) => {
                cy.wrap($card).find("p").contains(matchingMovies[index].title);
            });
        });
        it("handles case when there are no matches", () => {
            const searchString = "xyxxzyyzz";
            cy.get("#filled-search").clear().type(searchString); // Enter m in text box
            cy.get(".MuiCardHeader-content").should("have.length", 0);
        });
    });
    describe("By movie genre", () => {
        it("show movies with the selected genre", () => {
            const selectedGenreId = 18;
            const selectedGenreText = "Drama";
            const matchingMovies = filterByGenre(movies, selectedGenreId);
            cy.get("#genre-select").click();
            cy.get("li").contains(selectedGenreText).click();
            cy.get(".MuiCardHeader-content").should(
                "have.length",
                matchingMovies.length
            );
            cy.get(".MuiCardHeader-content").each(($card, index) => {
                cy.wrap($card).find("p").contains(matchingMovies[index].title);
            });
        });
    });
    describe("Filtering by year", () => {
        it("only display movies released in 1988", () => {
            const year = 1988;
            const matchingMovies = filterByYear(movies, year);
            cy.get("#year-search").clear().type(year.toString());
            cy.get(".MuiCardHeader-content").should("have.length", matchingMovies.length);
            matchingMovies.forEach((movie, index) => {
                cy.get(".MuiCardHeader-content").eq(index).find("p").contains(movie.title);
            });
        });
    });

    describe("By movie rating", () => {
        it("only display movies with a rating of 8-9", () => {
            const rating = "8-9";
            const matchingMovies = filterByRating(movies, rating);
            cy.get("#rating-search").select(rating);
            cy.get(".MuiCardHeader-content").should(
                "have.length",
                matchingMovies.length
            );
            matchingMovies.forEach((movie, index) => {
                cy.get(".MuiCardHeader-content")
                    .eq(index)
                    .find("p")
                    .contains(movie.title);
            });
        });
    });
    describe("Combined filters", () => {
        it("show movies with the specified text, genre, year and rating", () => {
            const searchString = "o";
            const selectedGenreId = 18;
            const year = "2023";
            const rating = "8-9";
            const matchingMovies = combinedFilter(movies, searchString, selectedGenreId, year, rating);

            cy.get("#filled-search").clear().type(searchString);
            cy.get("#genre-select").click();
            cy.get("li").contains("Drama").click();
            cy.get("#year-search").clear().type(year);
            cy.get("#rating-search").select(rating);

            cy.get(".MuiCardHeader-content").should(
                "have.length",
                matchingMovies.length
            );

            matchingMovies.forEach((movie, index) => {
                cy.get(".MuiCardHeader-content")
                    .eq(index)
                    .find("p")
                    .contains(movie.title);
            });
        });
    });
});