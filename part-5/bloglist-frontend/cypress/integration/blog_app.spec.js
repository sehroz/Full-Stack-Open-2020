describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
    const user = {
      name: 'Sehroz',
      username: 'sehroz',
      password: '12345',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
  })

  it('Login form is shown', function () {
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
    cy.contains('login').click()
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('sehroz')
      cy.get('#password').type('12345')
      cy.get('#login-button').click()

      cy.contains('Logged In')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('abcd')
      cy.get('#password').type('abcd')
      cy.get('#login-button').click()

      cy.contains('invalid username or password')
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('sehroz')
      cy.get('#password').type('12345')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.get('#makeBlog').click()
      cy.get('#title').type('sehroz')
      cy.get('#author').type('12345')
      cy.get('#url').type('sehroz.com')
      cy.get('#submitBlogButton').click()

      cy.contains('a new blog sehroz by 12345 added')
    })
    it('A blog can be liked', function () {
      cy.get('#makeBlog').click()
      cy.get('#title').type('sehroz')
      cy.get('#author').type('12345')
      cy.get('#url').type('sehroz.com')
      cy.get('#submitBlogButton').click()
      cy.get('#showBlog').click()

      cy.get('#likeButton').click()

      cy.contains('Liked')
    })

    it('A blog can be deleted', function () {
      cy.get('#makeBlog').click()
      cy.get('#title').type('sehroz')
      cy.get('#author').type('12345')
      cy.get('#url').type('sehroz.com')
      cy.get('#submitBlogButton').click()
      cy.get('#showBlog').click()

      cy.get('#deleteBlogButton').click()

      cy.contains('Deleted sehroz by 12345')
    })
  })
})
