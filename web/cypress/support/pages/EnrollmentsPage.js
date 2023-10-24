import Navbar from "../components/Navbar"
import Popup from "../components/Popup"

class EnrollmentPage {

    constructor() {
        this.navbar = Navbar
        this.popup = Popup
    }

    selectDatas(item, value) {
        cy.get(`.select_${item}`).click()
        cy.get(`input[aria-label='select_${item}']`).type(value)
        //cy.intercept('GET', `http://localhost:3333/students?name=${value}&page=1&perPage=10`).as('getStudents')
        //cy.wait('@getStudents').its('response.statusCode').should('eq', 200)
        cy.wait(10000)
        cy.contains('div[id*="option"]', value, { timeout: 10000 }).click()
    }

    fillInPayment(value) {
        cy.get('#card_number').type('4242424242424242')
        cy.get('#card_holder').type(value)
        cy.get('#card_month').type('09')
        cy.get('#card_year').type('20s26')
        cy.get('#card_cvv').type('123')
    }

    submit() {
        //cy.get('button[form=formSudent]').click()
        cy.contains('button', 'Cadastrar').click()
    }

    alertMessage(field, msg) {
        cy.contains('label', field)
            .parent()
            .find('span')
            .should('have.text', msg)
    }

}

export default new EnrollmentPage()