const auth = require('basic-auth');
const { Users } = require('../models');
const bcrypt = require('bcryptjs');

exports.authenticateUser = async (req, res, next) => {
    let message;
    const credentials = auth(req);
    console.log(credentials)

    if (credentials) {
        const user = await Users.findOne({ where: { emailAddress: credentials.name} });
        if (user) {
            const authenticated = bcrypt
                .compareSync(credentials.pass, user.password);
            if (authenticated) {
                console.log(`Authentication successful for user ${user.emailAddress}`)

                req.currentUser = user;
            } else {
                message = 'Authentication failure';
            }
        } else {
            message = 'User not found';
        }
    } else {
        message = 'Auth header not found';
    }

    if (message) {
        console.warn(message);
        res.status(401).json({ message: 'Access denied' })
    } else {
        next();
    }
}