/* eslint-disable no-undef */
// let trendingMovies;

describe("Must Watch feature on Trending Movies page", () => {
    before(() => {
        cy.request(
            `https://api.themoviedb.org/3/trending/movie/day?api_key=${Cypress.env("TMDB_KEY")}`
        )
            .its("body")
            .then((response) => {
                trendingMovies = response.results;
            });
    });

    beforeEach(() => {
        cy.visit("/trending");
    });

    it("allows a movie to be added and removed from must watch", () => {
        // Check that the 'must watch' icon is not initially present
        cy.get(".MuiCardHeader-root").eq(1).find("svg[data-testid='PlaylistAddIcon']").should("not.exist");

        // Click 'must watch' button to add movie to must watch
        cy.get("button[aria-label='add to must watch']").eq(1).click();
        cy.get(".MuiCardHeader-root").eq(1).find("svg[data-testid='PlaylistAddIcon']");

        // Click 'must watch' button again to remove movie from must watch
        cy.get("button[aria-label='add to must watch']").eq(1).click();
        cy.get(".MuiCardHeader-root").eq(1).find("svg[data-testid='PlaylistAddIcon']").should("not.exist");
    });
});