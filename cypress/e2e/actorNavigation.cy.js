/* eslint-disable no-undef */

describe('Movie Actor Navigation', () => {
  
  it('navigates to the TMDB actor info page when an actor link is clicked', () => {
    const movieId = 872585; 
    cy.visit(`/movies/${movieId}`); 

    cy.get('.cast-list').should('exist');

    cy.get('ul').within(() => {
      // Assert that the link exists and has the correct attributes before clicking
      cy.contains('Cillian Murphy as J. Robert Oppenheimer')
        .should('have.attr', 'href', 'https://www.themoviedb.org/person/2037-cillian-murphy')
        .and('have.attr', 'target', '_blank')
        .invoke('removeAttr', 'target') 
        .click();
    });

    // After clicking, assert the redirection has occurred successfully
    cy.url().should('include', '/person/2037-cillian-murphy'); 
  
  });
});

