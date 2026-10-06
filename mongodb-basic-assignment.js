// Task 1: Setup and data creation

use company

db.employees.insertMany([
  {
    _id: "EMP001",
    name: "John",
    department: "Engineering",
    experience: 4,
    skills: ["Java", "SpringBoot"],
    active: true,
    address: {
      city: "Pune",
      country: "India"
    }
  },
  {
    _id: "EMP002",
    name: "Alice",
    department: "HR",
    experience: 3,
    skills: ["Recruitment", "Communication"],
    active: true,
    address: {
      city: "Mumbai",
      country: "India"
    }
  },
  {
    _id: "EMP003",
    name: "David",
    department: "Engineering",
    experience: 6,
    skills: ["Java", "MongoDB"],
    active: true,
    address: {
      city: "Bengaluru",
      country: "India"
    }
  },
  {
    _id: "EMP004",
    name: "Emma",
    department: "Finance",
    experience: 2,
    skills: ["Accounting", "Excel"],
    active: false,
    address: {
      city: "Pune",
      country: "India"
    }
  },
  {
    _id: "EMP005",
    name: "Robert",
    department: "Engineering",
    experience: 5,
    skills: ["Java", "Docker"],
    active: true,
    address: {
      city: "Delhi",
      country: "India"
    }
  }
])

show dbs
show collections
db.employees.countDocuments()
db.employees.find()

// Task 2.1: Engineering employees

db.employees.find(
  { department: "Engineering" },
  { _id: 1, name: 1, experience: 1 }
).sort({ name: 1 })

// Task 2.2: Experience 5 or more

db.employees.find(
  { experience: { $gte: 5 } },
  { _id: 0, name: 1, experience: 1 }
).sort({ experience: -1 })

// Task 2.3: Employees from Pune

db.employees.find(
  { "address.city": "Pune" },
  { _id: 0, name: 1, "address.city": 1 }
).sort({ name: 1 })

// Task 2.4: MongoDB or Spring Boot skills

db.employees.find(
  { skills: { $in: ["MongoDB", "Spring Boot"] } },
  { _id: 0, name: 1, skills: 1 }
).sort({ name: 1 })

// Task 2.5: Top 2 employees by experience

db.employees.find(
  {},
  { _id: 0, name: 1, experience: 1 }
).sort({ experience: -1 }).limit(2)

// Task 3.1: Increase Alice's experience

db.employees.updateOne(
  { name: "Alice" },
  { $inc: { experience: 1 } }
)

db.employees.findOne(
  { name: "Alice" },
  { _id: 0, name: 1, experience: 1 }
)

// Task 3.2: Activate Emma

db.employees.updateOne(
  { name: "Emma" },
  { $set: { active: true } }
)

db.employees.findOne(
  { name: "Emma" },
  { _id: 0, name: 1, active: 1 }
)

// Task 3.3: Add MongoDB to Robert's skills

db.employees.updateOne(
  { name: "Robert" },
  { $addToSet: { skills: "MongoDB" } }
)

db.employees.findOne(
  { name: "Robert" },
  { _id: 0, name: 1, skills: 1 }
)

db.employees.updateOne(
  { name: "Robert" },
  { $addToSet: { skills: "MongoDB" } }
)

db.employees.findOne(
  { name: "Robert" },
  { _id: 0, name: 1, skills: 1 }
)

// Task 4: Delete temporary employee

db.employees.insertOne({
  _id: "EMP999",
  name: "Temporary Employee",
  department: "Training",
  experience: 0
})

db.employees.deleteOne({
  _id: "EMP999"
})

db.employees.findOne({
  _id: "EMP999"
})

db.employees.countDocuments()

// Task 5.1: Check indexes

db.employees.getIndexes()

// Task 5.2: Create department index

db.employees.createIndex({ department: 1 })

// Task 5.3: Verify indexes

db.employees.getIndexes()

// Task 6.1: Employees per department

db.employees.aggregate([
  {
    $group: {
      _id: "$department",
      count: { $sum: 1 }
    }
  },
  {
    $sort: {
      _id: 1
    }
  }
])

// Task 6.2: Average experience per department

db.employees.aggregate([
  {
    $group: {
      _id: "$department",
      averageExperience: { $avg: "$experience" }
    }
  },
  {
    $sort: {
      _id: 1
    }
  }
])

// Task 6.3: Top Engineering employees

db.employees.aggregate([
  {
    $match: {
      department: "Engineering"
    }
  },
  {
    $project: {
      _id: 0,
      name: 1,
      experience: 1
    }
  },
  {
    $sort: {
      experience: -1
    }
  },
  {
    $limit: 2
  }
])