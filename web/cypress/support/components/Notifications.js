
class Notification {

    verifyNotification(question) {
        cy.contains('.scrollbar-container p', question).should('be.visible')
    }

    answerNotification(question, answer) {
        cy.contains('.scrollbar-container p', question)
            .should('be.visible')
            .click()
        cy.get('textarea[id=answer]').type(answer)
        cy.get('form[id=answer] button').click()
    }
}

export default new Notification()