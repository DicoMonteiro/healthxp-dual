import Popup from "../components/Popup"

class LoginPage {

    constructor() {
        this.popup = Popup
    }

    go(){
        cy.visit('/')
    }

    fillIn(user) {
        cy.get('#email').clear().as('email')
        cy.get('#password').clear().as('password')

        user.email ? cy.get('@email').type(user.email) : cy.log('empty email')
        user.password ? cy.get('@password').type(user.password) : cy.log('empty password')
        
        //if(user.email){cy.get('@email').type(user.email)}
        //if(user.password){cy.get('@password').type(user.password)}
    }

    submit() {
        cy.contains('button[type=submit]', 'Entrar').click()
    }

    doLogin(user) {
        this.go()
        this.fillIn(user)
        this.submit()
    }
}

export default new LoginPage()