const router = require('express').Router()
const Student = require('../models/Student')

router.post('/', async (req, res) => {
    try {
        const index = req.body.index
        const nic = req.body.nic

        const student = await Student.findOne({ index })

        if (!student)
            return res.send({ code: 404 })

        if (student.nic != nic)
            return res.send({ code: 401 })

        return res.send({ code: 200, student })

    } catch (error) {
        return res.send({ code: 500 })
    }
});

module.exports = router
