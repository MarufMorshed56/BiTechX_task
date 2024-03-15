const express = require("express")
const UserRoute = require('./Routes/UserRoute')
const cors = require("cors");
const bodyParser = require('body-parser')



const app = express()

app.use(cors())
app.use(bodyParser.json({limit: '100000kb'}))
app.use("/api/user", UserRoute)



app.get('/', (req, res) => {
     res.status(200);
     res.send("Welcome to root Server");
});



const port = process.env.PORT || 5000
const start = async () => {
     try {
          app.listen(port, console.log(`server listening to port ${port}`))
     } catch (error) {
          console.log(error)
     }
}

start()