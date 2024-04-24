describe('Book New Form', () => {
  const randomISBN = Math.floor(1000000000000 + Math.random() * 900000);
  let count = 0;
  before(() => {
    cy.visit('/');
  });
  it('create a Book', () => {
    // click the create button
    cy.get('mat-card').then(list => {
      count = list.length;
    });
    cy.get('[routerlink="books/new"]').click();
    // fill in the books formula
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('[formControlName="isbn"]').type(randomISBN + '');
    cy.get('[formControlName="title"]').type(randomISBN + '');
    cy.get('button[type="submit"]').should('be.enabled');
    // save the new book
    cy.get('button[type="submit"]').click();
    // navigate back to the start page
    // assert that one more book is in the list as before
    cy.get('mat-card').then(list => {
      console.log(count, list.length);
      expect(list.length === count + 1).to.be.true;
    });

    cy.request('DELETE', 'http://localhost:4730/books/' + randomISBN);
  });
});
