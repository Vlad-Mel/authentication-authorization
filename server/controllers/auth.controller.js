import jwt from 'jsonwebtoken';
import User from './../models/user.model'
import { expressjwt } from 'express-jwt';
import config from './../../config/config';


const signin = async (req, res) => {

    try {

        let user = await User.findOne({ "email": req.body.email })

        if (!user) {
            return res.status(401).json({
                error: "User not found"
            })
        }

        if (!user.authenticate(req.body.password)) {
            console.log(req.body.password)

            return res.status(401).json({
                error: "Email and password don't match"
            })
        }

        const token = jwt.sign({ _id: user._id}, config.jwtSecret);

        res.cookie('t', token, { expires: new Date(Date.now() + 9999) })
        
        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (err) {
        console.error(`User: ${req.body.email}.\n Error: ${err}`)

        return res.status(401).json({
            error: `Could not sign in`
        })
    }
}

const signout = async (req, res) => {
    res.clearCookie("t");
    return res.status(200).json({
        message: "signed out"
    })
}

const requireSignin = expressjwt ({
    algorithms: ["HS256"],
    secret: config.jwtSecret,
    userProperty: 'auth'
})



const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id;

    if (!authorized) {
        return res.status(403).json({
        error: "User is not authorized"
        })
    }
    next();
}

export default {
    signin, 
    signout, 
    requireSignin, 
    hasAuthorization
}