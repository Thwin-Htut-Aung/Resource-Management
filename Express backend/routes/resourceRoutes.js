const express = require("express")
const router1 = express.Router()
const { MongoClient, ObjectId } = require("mongodb")
const {Employee, Instock, Outstock, department, Department} = require('../data-models/model')

const connectJumpstartDB = require('../data-models/connections')
const db = connectJumpstartDB()
const employeeCollection = db.collection('employees')
const instockCollection = db.collection('instock')
const outstockCollection = db.collection('outstock')
const departmentCollection = db.collection('departments')
const userCollection = db.collection('users')

router1
.get('/all-employees', (req, res)=>{
     employeeCollection.find().toArray()
    .then((employees)=>{
      res.json(employees)
    })
    .catch((err)=>{
      console.error(err)
    })
})

.get('/all-instock', (req, res)=>{
    instockCollection.find().toArray()
    .then((products)=>{
      res.json(products)
    })
})

.get('/all-outstock', (req, res)=>{
    outstockCollection.find().toArray()
    .then((products)=>{
      res.json(products)
    })
})

.get('/all-departments', (req, res)=>{
    departmentCollection.find().toArray()
    .then((departments)=>{
      res.json(departments)
    })
})

.get('/change-status', async (req, res) => {
  const id = req.query.id
  const currentStatus = req.query.currentStatus

  try{
    if(currentStatus==="instock"){
      const product = await instockCollection.findOne({_id: new ObjectId(id)})
      const date = new Date()
      const day = date.getDate()
      const month = date.toLocaleString('default', { month: 'long' })
      const year = date.getFullYear()
      const newProduct = new Outstock(product.productName, product.productPrice, `${day} ${month} ${year}`)
      await outstockCollection.insertOne(newProduct)
      await instockCollection.deleteOne({_id: new ObjectId(id)})
    }else{
      const product = await outstockCollection.findOne({_id: new ObjectId(id)})
      const newProduct = new Instock(product.productName, product.productPrice, '1')
      await instockCollection.insertOne(newProduct)
      await outstockCollection.deleteOne({_id: new ObjectId(id)})
    }

    res.json({successMessage: 'Product status successfully updated'})
  }catch{
    res.status(500).json({error: 'Something went wrong'})
  }
  
})


.post('/add-employee', (req, res)=>{
    const employeeId = req.body.employeeId
    const name = req.body.employeeName
    const role = req.body.jobRole
    const department = req.body.department
    
    const newEmployee = new Employee(employeeId, name, role, department)

    employeeCollection.insertOne(newEmployee)
    .then((result) => {
        console.log('Employee added')
        res.status(200).json({ successMessage: 'Employee added successfully' })
       })
    .catch((err) => {
        console.error('Error adding employee:', err)
        res.status(500).json({error: 'Internal server error'})
    })

    departmentCollection.findOne({departmentName: department}).then(dep=>{
      departmentCollection.updateOne(
        { _id: new ObjectId(dep._id) },
        { $push: { employees: newEmployee } }
      )
    })
})

.post('/add-instock', (req, res)=>{
    const name = req.body.productName
    const price = req.body.productPrice
    const quantity = req.body.productQuantity
    const newProduct = new Instock(name, price, quantity)

    instockCollection.insertOne(newProduct)
    .then((result) => {
        console.log('Product added')
        res.json({ successMessage: 'Product added successfully' })
       })
    .catch((err) => {
        console.error('Error adding product:', err)
        res.status(500).json({error: 'Internal server error'})
    })
})

.post('/add-outstock', (req, res)=>{
    const name = req.body.productName
    const price = req.body.productPrice
    const lastDate = req.body.productLastDate
    const newProduct = new Outstock(name, price, lastDate)

    outstockCollection.insertOne(newProduct)
    .then((result) => {
        console.log('Product added')
        res.status(200).json({ successMessage: 'Product added successfully' })
       })
    .catch((err) => {
        console.error('Error adding product:', err)
        res.status(500).json({error: 'Internal server error'})
    })
})

.post('/add-department', (req, res)=>{
    const name = req.body.departmentName
    const task = req.body.task
    var employees = req.body.employees
    if(!employees){
      employees = []
    }

    const newDepartment = new Department(name, task, employees)

    departmentCollection.insertOne(newDepartment)
    .then((result) => {
        console.log('department added')
        res.status(200).json({ successMessage: 'department added successfully' })
       })
    .catch((err) => {
        console.error('Error adding department:', err)
        res.status(500).json({error: 'Internal server error'})
    })
})

.put('/update-employee', async (req, res)=>{
  const id = req.body.id
  const employeeId = req.body.employeeId
  const name = req.body.employeeName
  const job = req.body.jobRole
  const department = req.body.department

  const updatedEmployee = {
    _id: new ObjectId(id),
    employeeId: employeeId,
    employeeName: name,
    jobRole: job,
    department: department
  }

  const oldEmployee = await employeeCollection.findOne({employeeId: employeeId})
  
  if(oldEmployee.department!==department){

    const oldDepartment = oldEmployee.department
    await departmentCollection.updateOne(
      { departmentName: oldDepartment },
      { $pull: { employees: { _id: new ObjectId(id) } } }
    )
  
    await departmentCollection.updateOne(
      { departmentName: department },
      { $push: { employees: updatedEmployee } }
    )
  }

  employeeCollection.updateOne(
    { _id: new ObjectId(id) },
      { $set: updatedEmployee }
    )
      .then((response) => {
        res.json({successMessage: 'Employee updated successfully'})
      })
      .catch((err) => {
        console.error('Error updating employee:', err)
        res.status(500).json({error: 'Internal server error'})
      })
  
})
      

.put('/update-instock', (req, res)=>{
    const id = req.body.id
    const updatedProduct = req.body

    instockCollection.updateOne(
        { _id: new ObjectId(id) },
          { $set: updatedProduct }
        )
          .then(() => {
            res.status(200).json({ successMessage: 'Product updated successfully' })
          })
          .catch((err) => {
            console.error('Error updating product:', err)
            res.status(500).json({error: 'Internal server error'})
          })
})

.put('/update-outstock', (req, res)=>{
    const id = req.body.id
    const updatedProduct = req.body

    outstockCollection.updateOne(
        { _id: new ObjectId(id) },
          { $set: updatedProduct }
        )
          .then(() => {
            res.status(200).json({ successMessage: 'Product updated successfully' })
          })
          .catch((err) => {
            console.error('Error updating product:', err)
            res.status(500).json({error: 'Internal server error'})
          })
})

.put('/update-department', async (req, res)=>{

    const newEmployees = req.body.employees
    const newDepartment = req.body.departmentName

    await newEmployees.map(employee =>{
      const oldDepartment = employee.department
      if(oldDepartment!==newDepartment){
         employeeCollection.updateOne(
          { employeeId: employee.employeeId },
          { $set: { department: newDepartment } }
        )

        departmentCollection.updateOne(
          { departmentName: oldDepartment },
          { $pull: { employees: {employeeId: employee.employeeId} } }
        )
      }

    })

    
    const newDep = await departmentCollection.findOne({departmentName: newDepartment})
    const oldEmployees = newDep.employees
    const leftEmployees = oldEmployees.filter((emp) => 
    !newEmployees.some((newEmp) => newEmp.employeeId === emp.employeeId))
    await leftEmployees.map(employee=>{
      employeeCollection.updateOne(
        {employeeId: employee.employeeId},
        {$set: {department: "None"} }
        )
      })

      
    const id = req.query.id
    const updatedDepartment = req.body
    departmentCollection.updateOne(
        { _id: new ObjectId(id) },
          { $set: updatedDepartment }
        )
          .then(() => {
            res.status(200).json({ successMessage: 'Department updated successfully' })
          })
          .catch((err) => {
            console.error('Error updating department:', err)
            res.status(500).json({error: 'Internal server error'})
          })
})

.delete('/delete-employee', async (req, res) => {
    const id = req.query.employeeId
    
    const employee = await employeeCollection.findOne({employeeId: id})
    const department = employee.department
    await departmentCollection.updateOne(
      { departmentName: department },
      { $pull: { employees: {employeeId: id } } }
    )

    try{
      await employeeCollection.deleteOne({employeeId: id})
      res.json({successMessage: 'Employee successfully deleted'})
    }catch(err){
      console.error('Error deleting employee:', err)
      res.status(500).json({error: 'Something went wrong'})
    }
    

})
  

  .delete('/delete-instock', (req, res) => {
    const id = req.query.id
  
    instockCollection.deleteOne({ _id: new ObjectId(id) })
      .then(() => {
        res.status(200).json({ successMessage: 'Product deleted successfully' })
      })
      .catch((err) => {
        console.error('Error deleting product:', err)
        res.status(500).json({ error: 'Something went wrong' })
      })
  })

  .delete('/delete-outstock', (req, res) => {
    const id = req.query.id
  
    outstockCollection.deleteOne({ _id: new ObjectId(id) })
      .then(() => {
        res.status(200).json({ successMssage: 'Product deleted successfully' })
      })
      .catch((err) => {
        console.error('Error deleting product:', err)
        res.status(500).json({ error: 'Something went wrong' })
      })
  })

  .delete('/delete-department', async (req, res) => {
    const id = req.query.id

    const department = await departmentCollection.findOne({_id: new ObjectId(id)})
  
    await employeeCollection.updateMany(
      { department: department.departmentName },
      { $set: {department: 'None'} }
    )
  
    departmentCollection.deleteOne({ _id: new ObjectId(id) })
      .then(() => {
        res.status(200).json({ successMessage: 'department deleted successfully' })
      })
      .catch((err) => {
        console.error('Error deleting department:', err)
        res.status(500).json({ error: 'Something went wrong' })
      })
  })



module.exports = router1