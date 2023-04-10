describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
    const user = {
      name: 'cat',
      username: 'cat',
      password: '123456',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('log in', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('cat')
      cy.get('#password').type('123456')
      cy.get('#login-button').click()

      cy.contains('cat logged in')
    })

    it.only('fails with wrong credentials', function () {
      cy.get('#username').type('cat')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'cat logged in')
    })
  })
})
