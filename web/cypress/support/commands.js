// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import user from '../fixtures/users.json'
import loginPage from './pages/LoginPage'
import studentPage from '../support/pages/StudentPage'

Cypress.Commands.add('adminLogin', () => {
    loginPage.doLogin(user.admin)
    studentPage.navbar.userLoggedIn(user.admin)
})

Cypress.Commands.add('validateLoginValid', (user) => {
    cy.get('aside .logged-user')
            .should('be.visible')
            .should('contain', "Olá, " + user.name)
})

Cypress.Commands.add('validateLoginInvalid', (msg) => {
    cy.get('#swal2-content')
            .should('be.visible')
            .should('have.text', msg)
})