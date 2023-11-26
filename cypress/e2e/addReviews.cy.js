/* eslint-disable no-undef */

before(() => {
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
    cy.get("button[aria-label='add to favorites']").eq(0).click();
    cy.get("button").contains("Favorites").click();
});

it("allows a user to write and submit a review for a favorite movie", () => {
    // Navigate to the Write Review page
    cy.get(".write-review-icon").first().click();
    cy.url().should("include", "/reviews/form");

    // Fill in the review form
    cy.get("#author").type("Jingyi");
    cy.get("#review").type("This is an excellent movie and worth watching!!!");

    // Submit the form
    cy.get("form").submit();

    // Confirmation message
    cy.contains("Thank you for submitting a review").should("be.visible");

    // Redirect back to favorites page
    cy.get("body").click();
    cy.url().should("include", "/movies/favorites");
});
