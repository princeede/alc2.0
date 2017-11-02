var Department = require("../models/department");

//Get all Departments
module.exports.getDepartments = function(req, res) {
    Department.find({}, function(err, departments) {
        if (err) {
            return res.send(err);
        }
        res.json(departments);
    }).sort({ 'name': 1 });
}

//Get a single department
module.exports.getDepartment = function(req, res) {
    res.send('Get A Single Department');
}

//create a new department (GET)
module.exports.createDepartment_get = function(req, res) {
    res.render('newdepartment')
}

//create a new department (post)
module.exports.createDepartment_post = function(req, res) {
    name = req.body.name;
    faculty = req.body.faculty;
    //var newDepartment = new Department;

    Department.create({ name: name, faculty: faculty }, function(err, department) {
        if (err) {
            return res.send(err)
        }
        res.redirect('/department/create');
    })

}

module.exports.updateDepartment_get = function(req, res) {
    res.send('Update department (GET)')
}

module.exports.updateDepartment_post = function(req, res) {
    res.send('Update department (POST)')
}

//delete a department (GET)
module.exports.deleteDepartment_get = function(req, res) {
    res.send('Delete a department (GET)');
}

//Handle delete department form
module.exports.deleteDepartment_post = function(req, res) {
    res.send('Delete a department (POST)')
}

module.exports