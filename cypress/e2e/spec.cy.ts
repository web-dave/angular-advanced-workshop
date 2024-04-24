describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.get('h2').should('contain.text', 'Books');
    // cy.contains('app is running!');
    cy.get('mat-card').click();
  });
});
