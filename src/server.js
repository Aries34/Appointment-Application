/* 
Name of Project: Appointment Application
Developer: Kwaku Duah
Email: kwakuduah77@icloud.com
*/

const express = require('express')

require('./database/db')

const userRouter = require('./routers/router')

const app = express()
app.use(express.json())
app.use(userRouter)



const PORT = process.env.PORT


app.listen(PORT, () => {

    console.log('Server')
})



