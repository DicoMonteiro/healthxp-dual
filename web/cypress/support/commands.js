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

// Cypress.Commands.add('validateLoginValid', (user) => {
//     cy.get('aside .logged-user')
//             .should('be.visible')
//             .should('contain', "Olá, " + user.name)
// })

// Cypress.Commands.add('validateLoginInvalid', (msg) => {
//     cy.get('#swal2-content')
//             .should('be.visible')
//             .should('have.text', msg)
// })

Cypress.Commands.add('createEnrollment', (enrollment) => {
    const payload = {
        "email": enrollment.student.email,
        "plan_id": enrollment.plan.id,
        "price": enrollment.plan.price
    }

    cy.request({
        //url: Cypress.env('apiHelper') + '/enrollments',
        url: 'http://localhost:5000/enrollments',
        method: 'POST',
        body: payload
    }).then(response => {
        expect(response.status).to.eq(201)
    })

    // cy.task('selectStudentId', enrollment.student.email)
    //     .then( result => {
    //         cy.request({
    //             url:'http://localhost:3333/sessions',
    //             method: 'POST',
    //             body: {"email": user.admin.email, "password": user.admin.password}
    //         }).then(response => {
    //             const payload = {
    //                 "student_id": result.success.rows[0].id,
    //                 "plan_id": enrollment.plan.id,
    //                 "credit_card": "4242"
    //             }
    //             cy.request({
    //                 url: 'http://localhost:3333/enrollments',
    //                 headers: {"Authorization": `Bearer ${response.body.token}`},
    //                 method: 'POST',
    //                 body: payload
    //             }).then(response => {
    //                 expect(response.status).to.eq(201)
    //             })
    //         })
    //     })
})

Cypress.Commands.add('resetStudent', (student) => {

    cy.request({
        //url: Cypress.env('apiHelper') + '/students',
        url: 'http://localhost:5000/students',
        method: 'POST',
        body: student
    }).then(response => {
        expect(response.status).to.eq(201)
    })
})

Cypress.Commands.add('deleteStudent', (studentEmail) => {

    cy.request({
        url: Cypress.env('apiHelper') + '/students/' + studentEmail,
        method: 'DELETE'
    }).then(response => {
        expect(response.status).to.eq(204)
    })
})

Cypress.Commands.add('selectStudent', (studentEmail) => {

    cy.request({
        url: Cypress.env('apiHelper') + '/students/' + studentEmail,
        method: 'GET'
    }).then(response => {
        expect(response.status).to.eq(200)
    })
})

Cypress.Commands.add('createQuestion', (data) => {

    cy.request({
        url: Cypress.env('apiHelper') + '/students/' + data.student.email,
        method: 'GET'
    }).then(response => {
        expect(response.status).to.eq(200)
        cy.request({
            url: Cypress.env('apiHealth') + '/students/' + response.body.id + '/help-orders',
            method: 'POST',
            body: { "question": data.question }
        }).then(response => {
            expect(response.status).to.eq(201)
        })
    })
})