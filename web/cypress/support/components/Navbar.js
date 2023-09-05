
class Navbar {

    userLoggedIn(user) {
        cy.get('aside .logged-user')
            .should('be.visible')
            .should('contain', "Olá, " + user.name)
    }

    newStudent() {
        cy.get("a[href='/students/new']").click()
    }

    newEnrollment() {
        cy.get("a[href='/enrollment/new']").click()
    }
}

export default new Navbar()