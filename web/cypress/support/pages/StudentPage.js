import Navbar from "../components/Navbar"
import Popup from "../components/Popup"

class StudentPage {

    constructor() {
        this.navbar = Navbar
        this.popup = Popup
    }

    fillIn(student) {
        if (student.name) { cy.get("input[placeholder='Digite seu nome completo']").clear().type(student.name) }
        if (student.email) { cy.get("input[placeholder='Digite seu endereço de email']").clear().type(student.email) }
        if (student.age) { cy.get('input[name=age]').clear().type(student.age) }
        if (student.weight) { cy.get('input[name=weight]').clear().type(student.weight) }
        if (student.feet_tall) { cy.get('input[name=feet_tall]').clear().type(student.feet_tall) }
    }

    submit() {
        //cy.get('button[form=formSudent]').click()
        cy.contains('button', 'Cadastrar').click()
    }

    search(studentName) {
        cy.get("input[placeholder='Buscar por nome'").type(studentName)
    }

    remove(studentEmail) {
        cy.contains('tr', studentEmail, { timeout: 10000 })
            .find('button')
            .click()
    }

    requiredField(field, msg) {
        cy.contains('label', field)
            .parent()
            .find('span')
            .should('have.text', msg)
    }

}

export default new StudentPage()