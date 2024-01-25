describe('app', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should be visible', () => {
    cy.get('#app').should('exist').and('be.visible')
  })
})
