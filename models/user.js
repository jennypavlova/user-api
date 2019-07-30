var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    givenName: String,
    familyName: String
}, {
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema)
