import { Schema, model } from "mongoose";
import crypto from 'crypto';

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },

    email: {
        type: String,                       // Data Type
        trim: true,                         // Remove whitespace before and after value
        unique: true,     // Makes the value unique in DB
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],     // regex for validation
        required: 'Email is required'       // It is required field
    },

    created: {
        type: Date,
        default: Date.now()
    },

    updated: Date,

    hashed_password: {
        type: String,
        required: "Password is required"
    },

    salt: String
});

UserSchema.virtual('password')   // Virtual field
          .set( function (password) {      
                    this._password = password
                    this.salt = this.makeSalt()
                    this.hashed_password = this.encryptPassword(password)
          })
          .get( function() {
            return this._password
          })

UserSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },

    encryptPassword: function (password) {
        if (!password) return ''
    
        try {
            return crypto
                        .createHmac('sha256', this.salt)
                        .update(password)
                        .digest('hex')
        } catch (err) {
            return ''
        }
    },

    makeSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + ''      // Generate Random Salt
    }
}

UserSchema.path('hashed_password').validate( function(v) {
    if (this._password && this._password.length < 6) {
        this.invalidate('password', 'Password must be at least 6 characters.')
    }

    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password is required.')
    }
}, null)

export default model('User', UserSchema);