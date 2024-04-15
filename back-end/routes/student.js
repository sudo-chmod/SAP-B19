const router = require('express').Router()
const Student = require('../models/Student')

router.post('/', async (req, res) => {
    try {
        const index = req.body.index
        const nic = req.body.nic

        const student = await Student.findOne({ index })

        if (!student)
            return res.status(404).send({ message: 'Index not found' })

        if (student.nic != nic)
            return res.status(401).send({ message: 'Invalid NIC' })

        return res.status(200).send(student)

    } catch (error) {
        return res.status(500).json(error)
    }
});

module.exports = router
