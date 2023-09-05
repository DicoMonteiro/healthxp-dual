const { defineConfig } = require("cypress");

const { Pool } = require("pg")

const dbConfig = {
  host: 'silly.db.elephantsql.com',
  user: 'tdlxhbtn',
  password: 'p9FLhfwhxTYyeKMI92Wl1PUY1QOs2kAN',
  database: 'tdlxhbtn',
  port: 5432

}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      on('task', {
        
        deleteStudent(studentEmail) {

          return new Promise((resolve, reject) => {
            const pool = new Pool(dbConfig)

            const query = 'DELETE FROM students WHERE email = $1;'

            pool.query(query, [studentEmail], (error, result) => {
                if(error) {
                  return reject({error: error})
                }

                resolve({success: result})

                pool.end()
            })
          })          
        },

        resetStudent(student) {

          return new Promise((resolve, reject) => {
            const pool = new Pool(dbConfig)

            const query = `
                WITH add AS (
                  INSERT INTO students (email, name, age, weight, feet_tall) 
                  VALUES ($1, $2, $3, $4, $5)
                )
                DELETE FROM students WHERE email = $1;
            `

            const values = [student.email, student.name, student.age, student.weight, student.feet_tall]

            pool.query(query, values, (error, result) => {
                if(error) {
                  return reject({error: error})
                }

                resolve({success: result})

                pool.end()
            })
          }) 
        }
      })
    },
  },
});
