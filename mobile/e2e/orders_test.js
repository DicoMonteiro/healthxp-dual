const orders = require('../fixture/orders.json')

Feature('Pedido de ajuda');

Scenario('deve poder enviar um pedido de ajuda', async ({ I, login, account, helpOrders }) => {
    const dataTest = orders.help

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
    account.goToHelperOrder()

    helpOrders.makeDoubt()
    helpOrders.fillInDoubet(dataTest.question)
    helpOrders.submitDoubt()

    I.popupHaveText(
        'Sua dúvida foi recebida e será avaliada pela nossa equipe. Agora é só aguardar para receber o nosso feedback.'
    )
})