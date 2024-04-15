const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    subCode: {
        type: String,
        required: true
    },
    subName: {
        type: String,
        required: true
    },
    subGrade: {
        type: String,
        required: true
    },
    subCredit: {
        type: Number,
        required: true
    },
    subCreditXGrade: {
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
        type: String,
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
    totalCreditXGrade: {
        type: Number,
        required: true
    },
    result: [resultSchema]
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
