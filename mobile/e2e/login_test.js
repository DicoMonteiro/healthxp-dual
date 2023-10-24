const students = require('../fixture/students.json')

Feature('login');

Scenario('deve logar com sucesso',  async ({ I, login, account }) => {

    const dataTest = students.success_login

    I.resetStudent(dataTest.student)

    const payloadEnrollment = {
        "email": dataTest.student.email,
        "plan_id": dataTest.plan.id,
        "price": dataTest.plan.price
    }

    const enrollment_code = await I.createEnrollment(payloadEnrollment)

    login.validateAppIsInstalled()
    login.with('<value IP computer>', enrollment_code)
    login.submitLogin()

    account.validateLoginSuccess('Minha conta')
    //I.wait(10)

});

Scenario('não deve logar com matrícula inexistente',  ({ I, login }) => {

    login.validateAppIsInstalled()
    login.with('<value IP computer>', 'ABC123')
    login.submitLogin()

    I.popupHaveText(
        'Acesso não autorizado! Entre em contato com a central de atendimento.'
    )

    //I.wait(10)

});

Scenario('não deve logar com o plano health', async ({ I, login }) => {

    const dataTest = students.insuccess_login

    I.resetStudent(dataTest.student)

    const payloadEnrollment = {
        "email": dataTest.student.email,
        "plan_id": dataTest.plan.id,
        "price": dataTest.plan.price
    }

    const enrollment_code = await I.createEnrollment(payloadEnrollment)

    login.validateAppIsInstalled()
    login.with('<value IP computer>', enrollment_code)
    login.submitLogin()

    I.popupHaveText(
        'Seu plano não possui permissão para uso do App! Entre em contato com a central de atendimento.'
    )

    //I.wait(10)

});