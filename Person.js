const mongoose = require('mongoose');
const schema = mongoose.Schema;

const PersoneSchema = new schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
//    username: {
//        type: String
////        required: true
//    },
//    profilep: {
//        type: String,
//        default: 'https://www.google.com/search?q=default+avatar+png&rlz=1C1RLNS_enIN821IN821&tbm=isch&source=iu&ictx=1&fir=NZxiRX4XL3wHsM%253A%252CwlR-LUq6RYGyQM%252C_&usg=AI4_-kRl5xrUsX4GMo9jj30Uyb7Sk50Hiw&sa=X&ved=2ahUKEwib4ebAp5PgAhVOAXIKHcjmAfAQ9QEwA3oECAQQCg#imgrc=1nWB9cA0OX6vyM:'
//    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Person = mongoose.model('myPeson', PersoneSchema);