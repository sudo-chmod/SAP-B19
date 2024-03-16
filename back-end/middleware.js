const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
    const token = req.cookies.accessToken

    if (!token)
        return res.status(401).send({ message: 'Unauthorized' })

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err)
            return res.status(403).send({ message: 'Forbidden' })
        next()
    })
}

module.exports = isAuth;
