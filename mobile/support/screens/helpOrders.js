const { I } = inject();

class helpOrders {
  constructor() {
    //insert your locators
    // this.button = '#button'
  }
  
  makeDoubt() {
    I.click('#btnHelperOrder')
  }

  fillInDoubt(msg) {
    I.fillField('#textQuestion', msg)
  }

  submitDoubt() {
    I.click('#btnSubmit')
  }

}

// For inheritance
module.exports = new helpOrders();