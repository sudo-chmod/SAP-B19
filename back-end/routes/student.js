const router = require('express').Router();
const Student = require('../models/Student');

router.get('/:index', async (req, res) => {
    try {
        const index = req.params.index;
        const student = await Student.findOne({ index });
        if (!student)
            return res.status(404).send({ message: 'Student not found' });
        res.status(200).json(student);
    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = router;
            