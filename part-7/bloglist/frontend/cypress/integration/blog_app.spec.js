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
      cy.get('#sehroz').click()

      cy.get('#likesehroz').click()

      cy.contains('Liked')
    })

    it('A blog can be deleted', function () {
      cy.get('#makeBlog').click()
      cy.get('#title').type('sehroz')
      cy.get('#author').type('12345')
      cy.get('#url').type('sehroz.com')
      cy.get('#submitBlogButton').click()
      cy.get('#sehroz').click()

      cy.get('#deleteBlogButton').click()

      cy.contains('Deleted')
    })

    it('Blogs sorted by most liked', function () {
      cy.get('#makeBlog').click()
      cy.get('#title').type('sehroz')
      cy.get('#author').type('12345')
      cy.get('#url').type('sehroz.com')
      cy.get('#submitBlogButton').click()

      cy.get('#sehroz').click()

      cy.get('#likesehroz').click()
      cy.get('#likesehroz').click()

      cy.get('#title').type('testt')
      cy.get('#author').type('testst')
      cy.get('#url').type('tsts.com')
      cy.get('#submitBlogButton')
        .click()
        .then(() => {
          cy.get('#testt').click()
          cy.get('#liketestt').click()
          cy.get('#liketestt').click()
          cy.get('#liketestt').click()
          cy.get('#liketestt').click()
        })

      cy.get('.likes:first').then(($like) => $like === 4)
    })
  })
})
