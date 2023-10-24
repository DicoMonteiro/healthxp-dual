import enrollments from '../fixtures/enrollments.json'
import enrollmentPage from '../support/pages/EnrollmentsPage'

describe('matriculas', () => {

    it('deve poder matricular um novo aluno', ()=> {
        const enrollment = enrollments.create
        //cy.task('resetStudent', enrollment.student)
        cy.resetStudent(enrollment.student)

        //Dado que o admin já está logado
        cy.adminLogin()

        //E deseja cadastrar uma nova matrícula
        enrollmentPage.navbar.accessEnrollments()
        enrollmentPage.navbar.newEnrollment()

        //Quando solicita cadastrar a matrícula
        enrollmentPage.selectDatas("plan", enrollment.plan.name)
        enrollmentPage.selectDatas("student", enrollment.student.name)
        enrollmentPage.fillInPayment(enrollment.student.name)
        enrollmentPage.submit()

        //Então deve visualizar a mensagem de sucesso e a matrícula cadastrada
        enrollmentPage.popup.haveText("Matrícula cadastrada com sucesso.")
    })

    it('não deve criar matrícla duplicada', ()=> {
        const enrollment = enrollments.duplicate

        //cy.task('resetStudent', enrollment.student)
        cy.resetStudent(enrollment.student)
        cy.createEnrollment(enrollment)

        //Dado que o admin já está logado
        cy.adminLogin()

        //E deseja cadastrar uma matrícula duplicada
        enrollmentPage.navbar.accessEnrollments()
        enrollmentPage.navbar.newEnrollment()
        

        //Quando solicita cadastrar a matrícula
        //cy.wait(10000)
        enrollmentPage.selectDatas("plan", enrollment.plan.name)
        enrollmentPage.selectDatas("student", enrollment.student.name)
        enrollmentPage.fillInPayment(enrollment.student.name)
        enrollmentPage.submit()

        //Então deve visualizar a mensagem de alerta
        enrollmentPage.popup.haveText("O aluno já possui matrícula cadastrada!")
    })


})