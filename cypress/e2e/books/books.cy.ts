describe('Books View', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('schould schow the App Title', () => {
    cy.get('mat-toolbar').should('contain.text', 'BOOK MONKEY');
  });
  it('should show 251 Books', () => {
    cy.get('mat-card').should('have.length', 251);
  });
});
