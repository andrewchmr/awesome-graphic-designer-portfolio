const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = Router();

router.post(
    '/login',
    [
        check('username', 'Enter correct username').exists(),
        check('password', 'Enter correct password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data for login'
                })
            }

            const {username, password} = req.body;

            const user = await User.findOne({username});

            if (!user) {
                return res.status(400).json({message: 'User not found'})
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({message: 'Incorrect password'})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            );

            res.json({token, userId: user.id})

        } catch (e) {
            res.status(500).json({message: 'Something went wrong, try again'})
        }
    });


module.exports = router;