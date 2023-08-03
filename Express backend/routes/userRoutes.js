const express = require("express")

const router = express.Router()
const { MongoClient, ObjectId } = require("mongodb")
const {User, Employee} = require('../data-models/model')
const connectJumpstartDB = require('../data-models/connections')
const { jwtSecret } = require("../config/config")
const db = connectJumpstartDB()
const usersCollection = db.collection('users')
const tokenCollection = db.collection('auth-tokens')
const employeeCollection = db.collection('employees')
const departmentCollection = db.collection('departments')


router
.get('/all-users', (req, res)=>{
  usersCollection.find().toArray()
  .then((users)=>{
    res.json(users)
  })
})

.post('/login', function(req, res) {
        
    const email = req.body.email
    const password = req.body.password
    usersCollection.findOne({ email })
    .then((user) => {
        // Check if the user credentials are valid
        if (user && password === user.password ) {
        console.log('User found:', user.userName)
        // Generate a JWT token
        const jwt = require('jsonwebtoken')
        const secretKey = jwtSecret
        const username = user.userName
        const token = jwt.sign({ username }, secretKey, { expiresIn: '3h' })

        tokenCollection.insertOne(
          { token, createdAt: new Date(), expireAfterSeconds: 10800 }, // TTL index set to 3 hours (10800 seconds)
          function(err) {
            if (err) {
              console.error('Failed to save token:', err)
              res.status(500).json({ error: 'Failed to save token' })
            } 

          })
          res.status(200).json({accessToken: token})

        } else {
        console.log('User not found.')
        res.status(401).json({ error: 'Invalid credentials' })
        }
     })
     .catch((err) => {
        console.error('Error finding user:', err)
     })
})

.post('/register', async (req, res) =>{
  
    const userName = req.body.username
    const userEmail = req.body.email
    const userPassword = req.body.password
    const employeeId = req.body.employeeId
    const jobRole = req.body.jobRole
    const department = req.body.department
    const role = 'Role_Employee'
    const newUser = new User(userName, userEmail, userPassword, role)
    const newEmployee = new Employee(employeeId, userName, jobRole, department)

    // Save the user to the "users" collection
    await usersCollection.insertOne(newUser)
     console.log('User registerd')
    
    const employee = await employeeCollection.findOne({employeeId})
     if(!employee){
      employeeCollection.insertOne(newEmployee)
     .then((result)=>{
      console.log('Employee added')
     })
     .catch((err)=>{
      console.log('Error adding employee')
      res.status(500).json({error: 'Internal server error'})
     })

    const dep = await departmentCollection.findOne({departmentName: department})
      await departmentCollection.updateOne(
        { _id: new ObjectId(dep._id) },
        { $push: { employees: newEmployee } }
      )

     }

    res.status(200).json({successMessage: 'You have signed up successfully'})

})

.post('/add-user', (req, res) =>{
  
  const userName = req.body.username
  const userEmail = req.body.email
  const userPassword = req.body.password
  const role = req.body.role
  const newUser = new User(userName, userEmail, userPassword, role)

  // Save the user to the "users" collection
  usersCollection.insertOne(newUser)
  .then((result) => {
   console.log('User registerd')
   res.status(200).json({ message: 'User added successfully' })
  })
  .catch((err) => {
   console.error('Error creating user:', err)
   res.status(500).json({error: 'Internal server error'})
  })
})

      .delete('/delete-user', async (req, res) => {
        const id = req.query.id
      
        await usersCollection.deleteOne({ _id: new ObjectId(id) })
          .then(() => {
            res.status(200).json({ successMessage: 'User deleted successfully' })
          })
          .catch((err) => {
            console.error('Error deleting user:', err)
            res.status(500).json({ error: 'Internal server error' })
          })
      })

      .put('/update-user', (req, res) => {
        const userId = req.query.id
        const updatedUser = req.body
      
        usersCollection.updateOne(
          { _id: ObjectId(userId) },
          { $set: updatedUser }
        )
          .then(() => {
            res.status(200).json({ message: 'User updated successfully' })
          })
          .catch((err) => {
            console.error('Error updating user:', err)
            res.status(500).json({ error: 'Internal server error' })
          })
      })

      .put('/change-role', async (req, res)=>{
        const id = req.body._id
        const userRole = req.body.role
       
        try{
          if(userRole==='Role_Admin'){
            await usersCollection.updateOne(
              {_id: new ObjectId(id)},
              {$set: {role: 'Role_Employee'}}
            )
          }else{
            await usersCollection.updateOne(
              {_id: new ObjectId(id)},
              {$set: {role: 'Role_Admin'}}
            )
          }
          res.json({successMessage: 'User role updated successfully'})
        }catch{
          res.status(500).json({error: 'Internal server error'})
        }

      })

      .get('/current-user', (req, res)=>{
        const userName = req.user.username
        usersCollection.findOne({userName})
        .then((user)=>{
          res.json(user)
        })
        .catch((err)=>{
          res.status(401).json({err: 'Unauthorized to access'})
        })
      
    })


module.exports = router