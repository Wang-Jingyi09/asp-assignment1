/* eslint-disable no-undef */

describe("Pagination Test", () => {
    let firstPageTitles = [];
  
    before(() => {
      cy.visit("/movies/upcoming"); // Assuming the root URL is where the movies are listed.
    });
  
    it("stores titles from the first page", () => {
      cy.get(".MuiTypography-root.MuiTypography-h5").each(($title) => {
        firstPageTitles.push($title.text().trim());
      });
    });
  
    it("navigates to the third page and checks for different movie titles", () => {
      cy.get('.MuiButtonBase-root.MuiPaginationItem-root[aria-label="Go to page 3"]').click();
      cy.get(".MuiTypography-root.MuiTypography-h5").each(($title) => {
        expect(firstPageTitles).to.not.include($title.text().trim());
      });
    });
  });
  

