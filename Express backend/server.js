const express = require('express')
const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000' // Allow requests from React
  }))
app.use(getCurrentUser)
//app.set('view engine', 'ejs')

const userRouter = require('./routes/userRoutes')
const resourceRouter = require('./routes/resourceRoutes')


app.use('/jumpstart/user', userRouter)
app.use('/jumpstart/resource', resourceRouter)

app.listen(4000)


const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config/config');
function getCurrentUser(req, res, next) {
    const token = req.headers.authorization
    
    if(token){
     const secretKey = jwtSecret
     jwt.verify(token, secretKey, function(err, decoded) {
      if (err) {
        // Invalid or expired token, return an error response
        res.status(401).json({ error: 'Invalid token' })
      } else {
        // Token is valid, decode the user
        req.user = decoded
        next()
      }
     })

    }else{
      next()
    }

}