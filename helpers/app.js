const express = require('express')
const app = express()
const db = require('./db')
const validator = require('express-joi-validation').createValidator({passError: true})
const Joi = require('joi');

app.use(express.json())

app.get('/', function (req, res) {
    res.json({ message: 'Hello API Helper' })
})

const schemaStudent = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      age: Joi.number().required(),
      weight: Joi.number().required(),
      feet_tall: Joi.number().required()
    })


app.post('/students', validator.body(schemaStudent), db.deleteAndCreateStudent)
app.delete('/students/:email', db.deleteStudentByEmail)
app.get('/students/:email', db.selectStudentByEmail)
app.post('/enrollments', db.insertEnrollmentByEmail)

app.use((err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
      // we had a joi error, let's return a custom 400 json response
      res.status(400).json({
        type: err.type, // will be "query" here, but could be "headers", "body", or "params"
        message: err.error.toString()
      });
    } else {
      // pass on to another error handler
      next(err);
    }
  });

app.listen(5000)