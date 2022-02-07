const app = require('./app')
const dotenv = require('dotenv')
const connectDatabase = require('./config/database')


//setting up config file
dotenv.config({ path: 'backEnd/config/config.env'})

//Connecting to database
connectDatabase(); 

app.listen(process.env.PORT, () => {
    console.log(`server started on Port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})