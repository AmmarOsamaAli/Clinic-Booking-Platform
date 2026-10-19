const mongoose = require('mongoose')

async function connectToDB(){
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Connected to Database: ${connection.connection.name}`)
    } catch (error) {
        console.log('Connection Failed', error)
        throw error
    }

}

module.exports = connectToDB