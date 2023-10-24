// in this file you can append custom step methods to 'I' object

module.exports = function() {
  return actor({

    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.

    popupHaveText(text){
      this.see(text, '#android:id/message')
    },

    resetStudent(student) {
      this.sendPostRequest('/students', student)
      this.seeResponseCodeIsSuccessful()
    },

    async createEnrollment(payload) {
      const response = await this.sendPostRequest('/enrollments', payload)
      this.seeResponseCodeIsSuccessful()

      return response.data.enrollment_code
    }

  });
}
