import data from '../fixtures/questions.json'
import studentPage from '../support/pages/StudentPage'

describe('notificações', ()=> {


    it('deve poder receber uma notificação com uma pergunta do aluno', ()=> {
        const dataTest = data.notification
        cy.resetStudent(dataTest.student)
        cy.createEnrollment(dataTest)
        cy.createQuestion(dataTest)

        //Dado que o admin já está logado
        cy.adminLogin()

        //Quando acesso as notificações
        studentPage.navbar.accessNotification()

        //Então deve visualizar a pergunta do aluno
        studentPage.notification.verifyNotification(dataTest.question)
    })

    it('deve responder a uma notificação recebida do aluno', ()=> {
        const dataTest = data.answer_norification
        cy.resetStudent(dataTest.student)
        cy.createEnrollment(dataTest)
        cy.createQuestion(dataTest)

        //Dado que o admin já está logado
        cy.adminLogin()

        //E deseja responder as notificações
        studentPage.navbar.accessNotification()

        //Quando responde as notificações
        studentPage.notification.answerNotification(dataTest.question, dataTest.answer)

        //Então deve exibir uma mensagem de envio com sucesso
        studentPage.popup.haveText('Resposta enviada com sucesso')
    })
})