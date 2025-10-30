import express from "express";
import {check, validationResult} from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import protect from "../middleware/auth.js";


const router = express.Router();

//generate jwt token 
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: '30d',
    });
};

//  POST api/auth/register
// Register a user & get token 
router.post(
    '/register',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({min:6}),
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {name, email, password} = req.body;

        try {
            let user = await User.findOne({email});

            if(user) {
                return res.status(400).json({msg: 'User already exists'});
            }

            user = new User({
                name,
                email,
                password,
            });

            await user.save();

            res.json({
                _id:user.id,
                name:user.name,
                email:user.email,
                token: generateToken(user.id),
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);


// post /api/auth/login
// Authenticate a user & get token

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({msg: 'Invalid Credentials'});
        }
        const isMatch = await user.matchPassword(password);

        if(!isMatch) {
            return res.status(400).json({msg: 'Invalid Credentials'});
        }

        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token: generateToken(user.id),
        });


    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
  }
);

// get/api/auth/me
// get logged in user

router.get('/me', protect, async (req,res) => {
    // req.user is set by the protect middleware
    res.json(req.user)
});

// put/api/auth/profile
// update user profile (name/email)

router.put(
    '/profile',
    protect,
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {name, email} = req.body;

        try {
            const user = await User.findById(req.user.id);

            if(user) {
                user.name = name || user.name;
                user.email = email || user.email;

                const updateUser = await user.save();

                res.json({
                    _id:updateUser.id,
                    name:updateUser.name,
                    email:updateUser.email,
                });
            }else {
                res.status(404).json({msg: 'User not found'});
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);

export default router;