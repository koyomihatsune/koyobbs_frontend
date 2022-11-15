describe('Authentication E2E Testing Without Network Stub', () => {
  it('Test Valid Register Account', () => {
    cy.visit('http://localhost:5173')
    cy.get('.fui-Button').click()
    cy.get('a').click()
    cy.get(':nth-child(1) > .fui-Input__input').type('automationtestingaccount1@gmail.com')
    cy.get(':nth-child(4) > .fui-Input__input').type('Dương Quá')
    cy.get(':nth-child(7) > .fui-Input__input').type('TieuLong@Nu123')
    cy.get('form > .fui-Button').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`This is an alert box!`)
    })
  })
})