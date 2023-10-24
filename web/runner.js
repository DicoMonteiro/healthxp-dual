const cypress = require('cypress')
const tesults = require('cypress-tesults-reporter');

const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjkyODg0MzU1LTlkM2ItNDYzOC1iNjkxLWE4Nzk2YjkyMTMwNS0xNjk3MjkzMjgwNjk0IiwiZXhwIjo0MTAyNDQ0ODAwMDAwLCJ2ZXIiOiIwIiwic2VzIjoiMzc4YzRiOTMtNzZlMy00N2MxLWE3ZGMtYTZhY2UwNDI4M2Y1IiwidHlwZSI6InQifQ.oLV7qV3VyrHBUN6VPPlNEzezs8Y8Qg1-vFt-XdrDV68'

cypress.run({
  // specs to run here
})
.then((results) => {
  const args = {
    target: TOKEN,
  }
  tesults.results(results, args);
})
.catch((err) => {
 console.error(err)
})