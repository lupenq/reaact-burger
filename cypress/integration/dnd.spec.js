describe('dnd', function () {
  before(function () {
    cy.visit('http://localhost:3000')
  })

  it('dnd work correct', function () {
    cy.get('div[id="drag"]').first()
      .trigger('dragstart')

    cy.get('div[id="drop"]')
      .trigger('dragenter')
      .trigger('drop')

    cy.get('.constructor-element').should('be.exist')
  })
})
