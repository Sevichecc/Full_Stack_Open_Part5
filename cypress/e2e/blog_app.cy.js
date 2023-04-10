describe('Blog app', function () {
  beforeEach(function () {
    cy.visit('')
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'cat',
      username: 'cat',
      password: '123456',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
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

    it('fails with wrong credentials', function () {
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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login(({ username: 'cat', password:'123456' }))
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#blogtitle').type('First Blog')
      cy.get('#blogauthor').type('Cat')
      cy.get('#blogurl').type('https://cat.one')
      cy.get('#create').click()
      cy.contains('a new blog First Blog by Cat')
    })

    describe('and several blog exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'the First Blog', author: 'Cat 1', url:'https://cat.one' })
        cy.createBlog({ title: 'the Second Blog', author: 'Cat 2', url:'https://cat.two' })
        cy.createBlog({ title: 'the First Blog', author: 'Cat 3', url:'https://cat.three' })
      })
      it.only('users can like a blog', function () {
        cy.contains('the Second Blog').parent().as('theBlog')
        cy.get('@theBlog').find('#visibility').click()
        cy.get('@theBlog').find('#like').click()
        cy.get('@theBlog').should('contain', 'likes 1')
      })
    })
  })
})
