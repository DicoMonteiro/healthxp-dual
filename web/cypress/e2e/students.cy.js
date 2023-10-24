import students from '../fixtures/students.json'
import { faker } from '@faker-js/faker';
import studentPage from '../support/pages/StudentPage'

describe('students', () => {

    // beforeEach(() => {
    //     cy.task('deleteStudent', students.student_success.email)
    // })


    it('deve poder cadastrar um novo aluno', () => {
        const student = students.create
        //cy.task('deleteStudent', student.email)
        cy.deleteStudent(student.email)

        //Dado que o admin já está logado
        cy.adminLogin()

        //E deseja cadastrar um novo aluno
        studentPage.navbar.newStudent()

        //Quando solicita cadastrar o novo aluno
        studentPage.fillIn(student)
        studentPage.submit()

        //Então deve visualizar a mensagem de sucesso e o aluno cadastrado
        studentPage.popup.haveText("Dados cadastrados com sucesso.")
    })

    it('não deve cadasrar com email duplicado', () => {
        const student = students.email_duplicated
        //cy.task('resetStudent', student)

        cy.resetStudent(student)
        //Dado que o admin já está logado
        cy.adminLogin()

        //E deseja cadastrar um novo aluno
        studentPage.navbar.newStudent()

        //Quando solicita cadastrar o novo aluno com email já cadastrado
        studentPage.fillIn(student)
        studentPage.submit()

        //Então deve visualizar a mensagem de alerta
        studentPage.popup.haveText("O email informado já foi cadastrado!")
    })

    it('deve remover um aluno sem matrícula', () => {
        const student = students.remove
        //cy.task('resetStudent', student)
        cy.resetStudent(student)

        //Dado que o admin já está logado
        cy.adminLogin()

        //Quando solicita remover um aluno sem matrícula
        studentPage.search(student.name)
        studentPage.remove(student.email)

        //Então deve visualizar a mensagem de alerta para confirmar ou não
        studentPage.popup.haveTitle("Confirma a exclusão?")
        studentPage.popup.haveText("Se você confirmar, o registro será permanentemente removido e essa ação não poderá ser desfeita.")

        //E ao confirmar a remoção deve exibir uma mensagem de sucesso
        studentPage.popup.confirmExclusion()
        studentPage.popup.haveText("Exclusão realizada com sucesso.")

    })

    it('todos os campos são obrigatório', () => {
        //Dado que o admin já está logado
        cy.adminLogin()

        //Quando solicita cadastrar um novo aluno sem infomar nenhum dado
        studentPage.navbar.newStudent()
        studentPage.submit()
        
        //Então deve visualizar mensagem de alerta
        studentPage.alertMessage("Nome completo","Nome é obrigatório")
        studentPage.alertMessage("E-mail","O email é obrigatório")
        studentPage.alertMessage("Idade", "A idade é obrigatória")
        studentPage.alertMessage("Peso (em kg)","O peso é obrigatório")
        studentPage.alertMessage("Altura","A altura é obrigatória")
    })

    it('idade inferior a 16 anos', () => {
        const student = students.under_16_year

        //Dado que o admin já está logado
        cy.adminLogin()

        //E deseja cadastrar um novo aluno
        studentPage.navbar.newStudent()

        //Quando solicita cadastrar o novo aluno com idade inferior
        studentPage.fillIn(student)
        studentPage.submit()

        //Então deve visualizar a mensagem de alerta
        studentPage.alertMessage("Idade", "A idade mínima para treinar é 16 anos!")
    })

    it.skip('idade inferior a 16 anos', () => {
        const student = students.inv_weight

        //Dado que o admin já está logado
        cy.adminLogin()

        //E deseja cadastrar um novo aluno
        studentPage.navbar.newStudent()

        //Quando solicita cadastrar o novo aluno com peso inválido
        studentPage.fillIn(student)
        studentPage.submit()

        //Então deve visualizar a mensagem de alerta
        studentPage.alertMessage("Peso (em kg)", "Peso não permitidos")
    })

    it.skip('idade inferior a 16 anos', () => {
        const student = students.inv_feet_tall

        //Dado que o admin já está logado
        cy.adminLogin()

        //E deseja cadastrar um novo aluno
        studentPage.navbar.newStudent()

        //Quando solicita cadastrar o novo aluno com altura inválidas
        studentPage.fillIn(student)
        studentPage.submit()

        //Então deve visualizar a mensagem de alerta
        studentPage.alertMessage("Altura", "Altura não permitida")
    })
})