describe('Book Collection', () => {
  const isbn = Math.floor(1000000000000 + Math.random() * 900000);
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:4730/books', { fixture: 'books' });
    cy.intercept('POST', 'http://localhost:4730/books').as('POST');
    cy.visit('/');
  });
  context('UI', () => {
    it('should show the header', () => {
      cy.get('.mat-drawer-content > .mat-toolbar > span').contains('BOOK MONKEY');
    });
  });
  context('Book List', () => {
    it('should be found in default', () => {
      cy.url().should('contain', '/books');
    });
  });
  context('create Book', () => {
    it('should lead to new Book Form', () => {
      cy.get('[routerlink="books/new"] > .mat-list-item-content').click();
      cy.url().should('contain', '/books/new');
      cy.get('.mat-raised-button').should('be.disabled');
      cy.get('[formControlName="isbn"').type('12');
      cy.get('[formControlName="isbn"').blur();
      cy.contains('ISBN has to be at least 3 characters long.');
      cy.get('[formControlName="isbn"').clear();
      cy.contains('ISBN is required');
      cy.get('[formControlName="isbn"').type(`${isbn}`);
      cy.get('[formControlName="title"').type('Hey ' + isbn);
      cy.get('[formControlName="author"').type('Dude');
      cy.get('.mat-raised-button').should('not.be.disabled').click();
      cy.url().should('contain', '/books');
      cy.get(`[ng-reflect-router-link="${isbn}"]`).click();
      cy.wait('@POST').then(interception => {
        console.log(interception);
      });
    });
    // it('should delete Book (' + isbn + ')', () => {
    //   cy.request('DELETE', 'http://localhost:4730/books/' + isbn);
    //   cy.visit('/');
    //   cy.get(`[ng-reflect-router-link="${isbn}"]`).should('not.exist');
    // });
  });
});
