
class Popup {

    content() {
        return cy.get('#swal2-content')
    }

    haveTitle(text) {
        cy.get(".swal2-title")
            .should('be.visible')
            .should('have.text', text)
    }

    haveText(msg) {
        this.content()
            .should('be.visible')
            .should('have.text', msg)
    }

    back() {
        //cy.contains('button[type=button]', 'Voltar').click()
        cy.get('.swal2-cancel').click()
    }

    ok() {
        //cy.contains('button[type=button]', 'Voltar').click()
        cy.get('.swal2-confirm').click()
    }

    confirmExclusion() {
        cy.contains('button', 'Confirmar').click()
    }

    cancelExclusion() {
        cy.contains('button', 'Não, mudei de ideia').click()
    }
}

export default new Popup()