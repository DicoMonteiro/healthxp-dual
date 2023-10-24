const {
  setHeadlessWhen,
  setCommonPlugins
} = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './e2e/*_test.js',
  output: './output',
  helpers: {
    Appium: {
      app: 'C:\\QAx\\projects\\healthxp-dual\\mobile\\app\\hxp-beta2.apk',
      platform: 'Android',
      device: 'emulator'
    },
    REST: {
      endpoint: 'http://localhost:5000'
    },
    JSONResponse: {
      requestHelper: 'REST'
    }
  },
  include: {
    I: './support/steps_file.js',

    login: "./support/screens/login.js",
    account: "./support/screens/account.js",
    helpOrders: "./support/screens/help.js",
    student: "./fixture/students.json",
    order: "./fixture/orders.json"
  },
  name: 'mobile',
  plugins: {
    'tesults': {
      'require': 'codeceptjs-tesults',
      'enabled': true,
      'target': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjkyODg0MzU1LTlkM2ItNDYzOC1iNjkxLWE4Nzk2YjkyMTMwNS0xNjk4MTYwMjQ1NTA2IiwiZXhwIjo0MTAyNDQ0ODAwMDAwLCJ2ZXIiOiIwIiwic2VzIjoiMWJiYTAxZjktZTJmOS00YWZlLTgzZTUtYmY5MTJlZjkyOGFlIiwidHlwZSI6InQifQ.yw2JYtzbe6aAHoa5oZZGbSCiV7pD6aqWzPPLbMhWd28'
    }
  }
}