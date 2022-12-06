var SERVER_NAME = 'patient-api'
var PORT = 8000;
var HOST = '192.168.2.23';

var getRequestCounter = 0;  // Request counter for get method
var postRequestCounter = 0; // Request counter for post method

var restify = require('restify')

  // Get a persistence engine for the patients
  patientsSave = require('save')('patients')

  // Create the restify server
  server = restify.createServer({name: SERVER_NAME})

  server.listen(PORT, HOST, function () {
  console.log('Server %s listening at %s', server.name, server.url)
  console.log('Resources:')
  console.log(' /patients')
  console.log(' /patients/:id')  
})

server
  // Allow the use of POST
  .use(restify.fullResponse())

  // Maps req.body to req.params so there is no switching between them
  .use(restify.bodyParser())

// Get all patients in the system
server.get('/patients', function (req, res, next) {
  console.log("patients Get : received request")

  getRequestCounter++   // Increase the count by 1.
  console.log("Get Request Counter : " + getRequestCounter)

  // Find every entity within the given collection
  patientsSave.find({}, function (error, patients) {

    console.log("patients Get : Sending response")

    // Return all of the patients data in the system
    res.send(patients)
  })
})

// Get a single patient by their id
server.get('/patients/:id', function (req, res, next) {

  console.log("patients Get : received request")

  getRequestCounter++   // Increase the counter by 1.
  console.log("Get Request Counter : " + getRequestCounter)

  // Find a single patient by their id within save
  patientsSave.findOne({ _id: req.params.id }, function (error, patients) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    if (patients) {
      console.log("patients Get : received request")

      // Send the user if no issues
      res.send(patients)
    } else {
      console.log("patients Get : Something went wrong!")

      // Send 404 header if the user doesn't exist
      res.send(404)
    }
  })
})

// Create a new user
server.post('/patients', function (req, res, next) {
  console.log("patients Post : received request")

  postRequestCounter++
  console.log("Post Request Counter : " + postRequestCounter)

  // Make sure name is defined
  if (req.params.patient_name === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('Patient name must be supplied'))
  }
  if (req.params.address === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('Address must be supplied'))
  }
  if (req.params.age === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('Age must be supplied'))
  }
  if (req.params.doctor === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('Doctor name must be supplied'))
  }
  
  var newPatient = {
		patient_name: req.params.patient_name, 
    address: req.params.address,
    age: req.params.age,
    gender: req.params.gender,
    contact_no: req.params.contact_no,
    department: req.params.department,
    doctor: req.params.doctor
	}

  // Create the user using the persistence engine
  patientsSave.create(newPatient, function (error, patients) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    console.log("patients Post : store patients successfully")

    // Send the user if no issues
    res.send(201, patients)
  })
})

// Update a user by their id
server.put('/patients/:id', function (req, res, next) {
  console.log("patients Put : received request")
  
  var updatePatient = {
    patient_name: req.params.patient_name, 
    address: req.params.address,
    age: req.params.age,
    gender: req.params.gender,
    contact_no: req.params.contact_no,
    department: req.params.department,
    doctor: req.params.doctor
	}
  
  // Update the user with the persistence engine
  patientsSave.update(updatePatient, function (error, patients) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    console.log("patients Put : Update patients successfully")

    // Send a 200 OK response
    res.send(200)
  })
})

// Delete user with the given id
server.del('/patients', function (req, res, next) {
  console.log("patients Delete : received request")

  // Delete the user with the persistence engine
  patientsSave.deleteMany({}, function (error, patients) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    console.log("patients Delete : all patients deleted")

    // Send a 200 OK response
    res.send("All patients deleted successfully.")
  })
})


// Create a patient's test record
server.post('/patients/:id/tests', function (req, res, next) {
  console.log("patients Post : received request")

  postRequestCounter++
  console.log("Post Request Counter : " + postRequestCounter)

  // Make sure name is defined
  if (req.params.patient_id === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('Patient ID must be supplied'))
  }
  if (req.params.nurse_name === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('nurse name must be supplied'))
  }
  if (req.params.date === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('date must be supplied'))
  }
  if (req.params.time === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('Time must be supplied'))
  }
  
  var newTest = {
		patient_id: req.params.patient_id, 
    nurse_name: req.params.nurse_name,
    date: req.params.date,
    time: req.params.time,
  	blood_pressue: req.params.blood_pressue,
    respiratory_rate: req.params.respiratory_rate,
    blood_oxygen: req.params.blood_oxygen,
    heart_rate: req.params.heart_rate
  }

  // Create the user using the persistence engine
  patientsSave.create(newTest, function (error, patients) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    console.log("patients Post : store patients successfully")

    // Send the user if no issues
    res.send(201, patients)
  })
})

// Get all patients in the system
server.get('/patients/:id/tests', function (req, res, next) {
  console.log("patients Test Record Get : received request")

  getRequestCounter++   // Increase the count by 1.
  console.log("Get Request Counter : " + getRequestCounter)

  // Find a single patient by their id within save
  patientsSave.find({ patient_id: req.params.id }, function (error, patients) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    if (patients) {
      console.log("patients Get : received request")

      // Send the user if no issues
      res.send(patients)
    } else {
      console.log("patients Get : Something went wrong!")

      // Send 404 header if the user doesn't exist
      res.send(404)
    }
  })
})