var mongoose = require("mongoose");

var facultySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

facultySchema.virtual('url').get(function() {
    return '/alc/faculty/' + this._id;
}).set(function() {
    var facultyUrl = facultySchema.url;
});

var Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty;