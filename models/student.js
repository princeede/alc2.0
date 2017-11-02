var mongoose = require("mongoose");

var studentSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },

    admissionNumber: {
        type: String,
        minlength: 9,
        maxlength: 9,
        required: true,
        unique: true
    },

    faculty: {
        type: mongoose.Schema.ObjectId,
        ref: "Faculty",
    },

    department: {
        type: mongoose.Schema.ObjectId,
        ref: "Department"
    },

    status: {
        type: Boolean,
        default: true,
        required: true
    }
});

studentSchema.virtual('url').get(function() {
    return '/alc/student/' + this._id;
});

studentSchema.virtual('fullName').get(function() {
    return this.firstName + ', ' + this.lastName;
});

var Student = mongoose.model("Student", studentSchema);

module.exports = Student;