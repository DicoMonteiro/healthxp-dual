const { I } = inject();

class login {
  constructor() {
    //insert your locators
    // this.button = '#button'
  }
  
  validateAppIsInstalled() {
    I.seeAppIsInstalled('com.papitorocks.healthxp')
  }

  with(ip, codeEnrollment) {
    I.fillField('#ipAddress', ip)
    I.fillField('#enrollment_code', codeEnrollment)
  }

  submitLogin() {
    I.click('#btnLogin')
  }

}

// For inheritance
module.exports = new login();
