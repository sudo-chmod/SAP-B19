const router = require('express').Router();
const Student = require('../models/Student');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    try {
        const index = req.body.index;
        const nic = req.body.nic;

        const student = await Student.findOne({ index })

        if (!student)
            return res.status(404).send({ message: 'Index not found' })

        if (student.nic !== nic)
            return res.status(404).send({ message: 'Invalid NIC' })

        const accessToken = jwt.sign(
            {
                _id: student._id,
                index: student.index
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' }
        )

        res.cookie('SAPB19accessToken', accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 1000 * 60 * 60 * 15
        })

        res.status(200).send({message: 'Login success'})
    } catch (error) {
        return res.status(500).json(error);
  }
});

router.get('/logout', (req, res) => {
    res.clearCookie('SAPB19accessToken')
    res.status(200).send({ message: 'Logout success' })
});

module.exports = router;