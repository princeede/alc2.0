var Faculty = require("../models/faculty");

//Get all Faculties
module.exports.getFaculties = function(req, res) {
    Faculty.find({}, function(err, faculties) {
        if (err) {
            res.send(err);
        }
        res.json(faculties);
    }).sort({ name: 1 }.count)
}

//Get a single faculty
module.exports.getFaculty = function(req, res) {
    var id = req.params.id;
    Faculty.findById(id, function(err, faculty) {
        if (err) {
            res.send(err);
        }
        res.json(faculty)
    })
}

//create a new faculty (GET)
module.exports.createFaculty_get = function(req, res) {
    res.render('newfaculty')
}

//create a new faculty (post)
module.exports.createFaculty_post = function(req, res) {
    var name = req.body.name;
    newFaculty = new Faculty({ name: name });
    newFaculty.save(function(err, faculty) {
        if (err) {
            return res.send(err);
        }
        res.render('newfaculty', { message: 'Faculty of ' + name + ' Created Succesfully' })
    })
}

module.exports.updateFaculty_get = function(req, res) {
    res.send('Update faculty (GET)')
}

module.exports.updateFaculty_post = function(req, res) {
    res.send('Update faculty (POST)')
}

//delete a faculty (GET)
module.exports.deleteFaculty_get = function(req, res) {
    res.send('Delete a faculty (GET)');
}

//Handle delete faculty form
module.exports.deleteFaculty_post = function(req, res) {
    res.send('Delete a faculty (POST)')
}

module.exports