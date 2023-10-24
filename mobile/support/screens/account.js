const { I } = inject();

class account {
  constructor() {
    //insert your locators
    // this.button = '#button'
  }

  validateLoginSuccess(text) {
    I.see(text)
  }

  goToHelperOrder() {
    I.click('Pedir ajuda')
  }

}

// For inheritance
module.exports = new account();
