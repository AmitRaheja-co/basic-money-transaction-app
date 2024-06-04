const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:admin@cluster0.l2gobzs.mongodb.net/paytm");

var db = mongoose.connection;

db.once('open', function () {
    console.log('Connected to DB');
})
.on('error', function (err) {
    console.log(err);
});


const userSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    username:String,
    password:String
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
	User,
  Account
};