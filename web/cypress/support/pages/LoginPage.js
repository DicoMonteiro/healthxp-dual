import Popup from "../components/Popup"

class LoginPage {

    constructor() {
        this.popup = Popup
    }

    go(){
        cy.visit('http://localhost:3000/')
    }

    fillIn(user) {
        if(user.email){cy.get('#email').clear().type(user.email)}
        if(user.password){cy.get('#password').clear().type(user.password)}
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