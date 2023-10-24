
class Navbar {

    userLoggedIn(user) {
        cy.get('aside .logged-user')
            .should('be.visible')
            .should('contain', "Olá, " + user.name)
    }

    accessEnrollments() {
        cy.get("a[href='/enrollments']").click()
    }

    newStudent() {
        cy.get("a[href='/students/new']").click()
    }

    newEnrollment() {
        cy.get("a[href='/enrollments/new']").click()
    }

    accessNotification() {
        cy.get('.notifications button').click({ force: true })
    }
}

export default new Navbar()