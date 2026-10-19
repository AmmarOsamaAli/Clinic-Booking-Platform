const dotenv = require('dotenv').config()
const app = require("./app.js");
const connectToDB = require("./config/db.js");

async function startServer() {
    try {
        const PORT = process.env.PORT || 3000;
        await connectToDB();
      
        app.listen(PORT, () => {
          console.log(`App is Running on Port: ${PORT}`);
        });
    } catch (error) {
        console.log(`Error: ${error}`)
    }   
}

startServer();
