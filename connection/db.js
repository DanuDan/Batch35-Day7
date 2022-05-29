const { Pool } = require ('pg')

const dbPool = new Pool({
    database: 'Batch35_personal_web',
    port: '5432',
    user: 'postgres',
    password :'root'
})
module.exports = dbPool