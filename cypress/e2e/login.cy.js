describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login page correctly', () => {
    // Assert elements exist on the login page
    cy.get('h1').contains('Selamat Datang Kembali');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').contains('Masuk').should('be.visible');
  });

  it('should successfully login and redirect to homepage', () => {
    // Note: Assuming there is a test user or you can mock the response.
    // For this demonstration, we'll try a common dummy credential or just check network
    // We can intercept the API call to mock a successful login response

    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: {
          token: 'fake-jwt-token'
        }
      }
    }).as('loginRequest');

    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: {
          user: {
            id: 'user-1',
            name: 'Test User',
            email: 'test@example.com',
            avatar: 'http://example.com/avatar.jpg'
          }
        }
      }
    }).as('getProfile');

    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Verify it hits the login endpoint
    cy.wait('@loginRequest');
    
    // Check if redirected to homepage based on header presence etc
    // The homepage might have threads or navigation
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('should display an error message on wrong credentials', () => {
    // Intercept to mock a failed login response
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login', {
      statusCode: 400,
      body: {
        status: 'fail',
        message: 'Email atau password salah'
      }
    }).as('loginFailed');

    cy.get('input[type="email"]').type('wrong@example.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginFailed');

    // Wait for the UI to display the error, maybe an alert or text
    cy.contains('Email atau password salah').should('be.visible');
  });
});