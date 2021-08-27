const db = require('./db')

const UserSchema = new db.mongoose.Schema({

    mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
})


module.exports = db.mongoose.model('users', UserSchema)