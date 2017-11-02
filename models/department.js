var mongoose = require('mongoose');

var departmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    faculty: {
        type: mongoose.Schema.ObjectId,
        ref: 'Faculty'
    }
});

departmentSchema.virtual('url').get(function() {
    return '/alc/department/' + this._id;
})

var Department = mongoose.model('Department', departmentSchema);

module.exports = Department