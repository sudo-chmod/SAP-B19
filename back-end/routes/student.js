import jwt from 'jsonwebtoken';
const router = require('express').Router();
const Student = require('../models/Student');

router.get('/', async (req, res) => {
    try {
        const token = req.cookies.SAPB19accessToken

        if (!token)
            return res.status(401).send({ message: 'Unauthorized' })

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err)
                return res.status(403).send({ message: 'Forbidden' })
            const student = await Student.findOne({ index: decoded.index });
    
            if (!student)
                return res.status(404).send({ message: 'Student not found' });
            res.status(200).json(student);
        })

    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = router;
            