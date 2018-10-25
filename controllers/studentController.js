var Student = require("../models/student");
var Department = require("../models/department");
var Faculty = require("../models/faculty");

exports.index = function(req, res) {
    Promise.all([Student.count({ gender: 'Male', status: true }), Student.count({ gender: 'Female', status: true }), Faculty.count(), Department.count(),
            Student.find({ status: true }).populate('faculty').populate('department'), Faculty.find(), Department.find()
        ])
        .then(function(data) {
            res.render('dashboard', { data: data })
        }).catch(function(err) {
            throw err;
        })
}

//Get all Students
module.exports.getStudents = function(req, res) {
    Student.find({ status: true }, function(err, students) {
            if (err) {
                res.send(err);
            }
            res.json(students);
        }) //.populate('faculty'); //.populate('department');
}

//Get a single student
module.exports.getStudent = function(req, res) {
    var admissionNumber = req.params.admissionNumber;
    Student.find({ admissionNumber: admissionNumber, status: true }, function(err, student) {
        if (err) {
            return res.send(err)
        }
        if (!student) {
            res.send('User not found')
        }
        res.json(student);
    }).populate('department')
}

module.exports.viewStudent = function(req, res) {
    var admissionNumber = req.params.admissionNumber;
    Student.find({ admissionNumber: admissionNumber, status: true }, function(err, student) {
        if (err) {
            return res.send(err);
        }
        if (!student) {
            return res.render('viewstudent', { data: 'Student Not Found' })
        }
        res.render('viewstudent', { data: student })
    }).populate('department').populate('faculty')
}

//create a new student (GET)
module.exports.createStudent_get = function(req, res) {
    res.render('newstudent')
}

//create a new student (post)
module.exports.createStudent_post = function(req, res) {
    req.checkBody('firstName', 'Enter your first name').notEmpty().isAlpha();
    req.checkBody('lastName', 'Enter your last name').notEmpty().isAlpha();
    req.checkBody('gender', 'Enter your gender').isIn(['Male', 'Female']);
    req.checkBody('admissionNumber', 'Enter your NSID').notEmpty().isAlpha().isLength({ min: 5, max: 9 });

    req.sanitizeBody('firstName').escape();
    req.sanitizeBody('firstName').trim();
    req.sanitizeBody('LastName').escape();
    req.sanitizeBody('LastName').trim();
    req.sanitizeBody('admissionNumber').escape();
    req.sanitizeBody('admissionNumber').trim();

    var errors = req.validationErrors();

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var gender = req.body.gender;
    var admissionNumber = req.body.admissionNumber;
    var faculty = req.body.faculty;
    var department = req.body.department;

    var student = {
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        admissionNumber: admissionNumber,
        faculty: faculty,
        department: department
    };

    Student.create(student, (doc, err) => {
        if (errors) {
            res.render('newstudent', { student: student, errors: errors })
        } else {
            student.save(function(err, success) {
                console.log("Saving student "+firstName)
                if (err) {
                    return res.send(err);
                }
                res.redirect('/');
            })
        }
    })

    
}


module.exports.updateStudent_get = function(req, res) {
    res.send('Update student (GET)')
}

module.exports.updateStudent_post = function(req, res) {
    var admissionNumber = req.params.admissionNumber;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var gender = req.body.gender;
    var faculty = req.body.faculty;
    var department = req.body.department;

    Student.update({ admissionNumber: admissionNumber }, {
        '$set': {
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            faculty: faculty,
            department: department
        }
    }, {}, function(err, success) {
        if (err) {
            return res.send(err);
        }
        res.redirect('/');
    })
}

//delete a student (GET)
module.exports.deleteStudent_get = function(req, res) {
    res.send('Delete a student (GET)')
}

//Handle delete student form
module.exports.deleteStudent_post = function(req, res) {
    admissionNumber = req.params.admissionNumber;
    Student.update({ admissionNumber: admissionNumber }, { '$set': { status: false } }, {}, function(err, success) {
        if (err) {
            return res.send(err);
        }
        console.log('Student deleted succesfully');
        res.redirect('/');
    })
}

module.exports