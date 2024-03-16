const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    credit: {
        type: Number,
        required: true
    },
    creditXgrade: {
        type: Number,
        required: true
    }
});

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    index: {
        type: String,
        required: true,
        unique: true
    },
    nic: {
        type: String,
        required: true,
        unique: true
    },
    degreeProgram: {
        type: String,
        required: true
    },
    rank: {
        type: Number,
        required: true
    },
    gpa: {
        type: Number,
        required: true
    },
    totalCredit: {
        type: Number,
        required: true
    },
    totalCreditXgrade: {
        type: Number,
        required: true
    },
    result: [resultSchema]
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
