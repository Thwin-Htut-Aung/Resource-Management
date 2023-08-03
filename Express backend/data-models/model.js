class User {
    constructor(userName, email, password, role) {
      this.userName = userName
      this.email = email
      this.password = password
      this.role = role
    }
  }

class Employee {
    constructor(employeeId, employeeName, jobRole, department) {
        this.employeeId = employeeId
        this.employeeName = employeeName
        this.jobRole = jobRole
        this.department = department
    }
}

class Instock {
    constructor(productName, productPrice, productQuantity) {
        this.productName = productName
        this.productPrice = productPrice
        this. productQuantity = productQuantity
    }
}

class Outstock {
    constructor(productName, productPrice, productLastDate) {
        this.productName = productName
        this.productPrice = productPrice
        this.productLastDate = productLastDate
    }
}

class Department {
    constructor(departmentName, task, employees) {
        this.departmentName = departmentName
        this.task = task
        this.employees = employees
    }
}


module.exports = {User, Employee, Instock, Outstock, Department}