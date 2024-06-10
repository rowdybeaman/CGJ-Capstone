require('dotenv').config()
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')
console.log(CONNECTION_STRING)
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    // dialectOptions: {
    //     ssl: {
    //         require: true,
    //         rejectUnauthorized: false
    //     }
    // }
})

module.exports = {
    sequelize
}
