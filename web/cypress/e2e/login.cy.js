import user from '../fixtures/users.json'
import loginPage from '../support/pages/LoginPage'
import studentPage from '../support/pages/StudentPage'

describe('login', () => {

    // Para utilizar o this.user somente é possível se o método for com function()
    // before(function() {
    //     cy.fixture('users.json').then((user) => {
    //         this.user = user[0].admin
    //     })
    // })

    it('deve logar com o perfil do admin', () => {
        
        //Dado que eu tenho um usuário admin cadastrado
        
        // const user = {
        //     email: 'admin@healthxp.com',
        //     password: 'xperience',
        //     name: 'Admin'
        // } 

        // cy.fixture('users').then(function(users) {
        //     cy.log(JSON.stringify(users[0].admin))

        //     cy.visit('http://localhost:3000/')
        //     cy.get('#email').type(users[0].admin.email)
        //     cy.get('#password').type(users[0].admin.password)
        //     cy.contains('button[type=submit]', 'Entrar').click()

        //     cy.get('aside .logged-user')
        //     .should('be.visible')
        //     .should('contain', "Olá, " + users[0].admin.name)
           
        // })

        // const user = this.user


        //Quando faço login do gestor de academias
        // cy.doLogin(user.admin)

        loginPage.doLogin(user.admin)

        //Então devo ver o dashboard
        studentPage.navbar.userLoggedIn(user.admin)
        
    })


    it('não deve logar com senha incorreta', () => {
        const msg = 'Suas credenciais são inválidas, por favor tente novamente!'
        //Dado que eu tenho um usuário admin cadastrado

        //Quando faço login do gestor de academias com a senha incorreta
        // cy.doLogin(user.invalidPassword)
        loginPage.doLogin(user.invalidPassword)

        //Então devo ver uma mensagem de alerta/erro
        // cy.validateLoginInvalid(msg)

        loginPage.popup.haveText(msg)
    })

    it('não deve logar com email não cadastrado', () => {
        const msg = 'Suas credenciais são inválidas, por favor tente novamente!'
        //Dado que eu tenho um usuário admin cadastrado

        //Quando faço login do gestor de academias com um email não cadastrado
        // cy.doLogin(user.email_notFound)
        loginPage.doLogin(user.email_notFound)

        //Então devo ver uma mensagem de alerta/erro
        // cy.validateLoginInvalid(msg)

        loginPage.popup.haveText(msg)
    })

    it('não deve logar com emails inválidos', () => {
        const msg = 'Insira um email válido.'
        //Dado que eu tenho um usuário admin cadastrado

        let outputMessages = []
        let expectMessages = []

        const users = user.emails_inavlid

        //Quando faço login do gestor de academias com um email inválido
        // cy.doLogin(user.email_invalid)

        loginPage.go()

        users.forEach(e => {
            loginPage.fillIn(e)
            loginPage.submit()
            //loginPage.popUpHave(msg)
            loginPage.popup.content().invoke('text')
                .then((t) => {
                    cy.log(t)
                    outputMessages.push(t)
                    expectMessages.push('Insira um email válido.')
                })
            loginPage.popup.back()

        });

        //Então devo ver uma mensagem de alerta/erro
        // cy.validateLoginInvalid(msg)

        cy.wrap(outputMessages).should('deep.equal', expectMessages)
    })

    it('não deve logar com o email em branco', () => {
        const msg = 'Os campos email e senha são obrigatórios.'
        //Dado que eu tenho um usuário admin cadastrado

        //Quando clico em entrar sem informar os dados de login
        // cy.doLogin(user.email_empty)

        loginPage.doLogin(user.email_empty)

        //Então devo ver uma mensagem de alerta/erro
        // cy.validateLoginInvalid(msg)

        loginPage.popup.haveText(msg)
    })

    it('não deve logar com a senha em branco', () => {
        const msg = 'Os campos email e senha são obrigatórios.'
        //Dado que eu tenho um usuário admin cadastrado

        //Quando clico em entrar sem informar os dados de login
        // cy.doLogin(user.password_empty)

        loginPage.doLogin(user.password_empty)

        //Então devo ver uma mensagem de alerta/erro
        // cy.validateLoginInvalid(msg)

        loginPage.popup.haveText(msg)
    })
})