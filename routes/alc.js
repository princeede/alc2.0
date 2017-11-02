var express = require('express');
var router = express.Router();

var studentController = require('../controllers/studentController');
var departmentController = require('../controllers/departmentController');
var facultyController = require('../controllers/facultyController');

//Get req for homepage
router.get('/', studentController.index);

//get request for creating a new student
router.get('/student/create', studentController.createStudent_get);

//post request for creating a new student
router.post('/student/create', studentController.createStudent_post);

//get req for reading all students
router.get('/students', studentController.getStudents);

//get req for a particular student
router.get('/student/:admissionNumber', studentController.getStudent);

//get req for viewing a particular student
router.get('/student/view/:admissionNumber', studentController.viewStudent);

//get req for updating a student
router.get('/student/update/:admissionNumber', studentController.updateStudent_get);

//post req for updating student
router.post('/student/update/:admissionNumber', studentController.updateStudent_post);

//get req for delete
router.get('/student/delete/:admissionNumber', studentController.deleteStudent_get);

//post req delete
router.post('/student/delete/:admissionNumber', studentController.deleteStudent_post);


/// Faculty Routes

//get request for creating a new faculty
router.get('/faculty/create', facultyController.createFaculty_get);

//post request for creating a new faculty
router.post('/faculty/create', facultyController.createFaculty_post);

//get req for reading all faculties
router.get('/faculties', facultyController.getFaculties);

//get req for a particular faculty
router.get('/faculty/:id', facultyController.getFaculty);

//get req for updating a faculty
router.get('/faculty/update/:id', facultyController.updateFaculty_get);

//post req for updating faculty
router.post('/faculty/update/:id', facultyController.updateFaculty_post);

//get req for delete
router.get('/faculty/delete/:id', facultyController.deleteFaculty_get);

//post req delete
router.post('/faculty/delete/:id', facultyController.deleteFaculty_post);



///Department Routes
//get request for creating a new department
router.get('/department/create', departmentController.createDepartment_get);

//post request for creating a new department
router.post('/department/create', departmentController.createDepartment_post);

//get req for reading all departments
router.get('/departments', departmentController.getDepartments);

//get req for a particular department
router.get('/department/:id', departmentController.getDepartment);

//get req for updating a department
router.get('/department/update/:id', departmentController.updateDepartment_get);

//post req for updating department
router.post('/department/update/:id', departmentController.updateDepartment_post);

//get req for delete
router.get('/department/delete/:id', departmentController.deleteDepartment_get);

//post req delete
router.post('/department/delete/:id', departmentController.deleteDepartment_post);


module.exports = router