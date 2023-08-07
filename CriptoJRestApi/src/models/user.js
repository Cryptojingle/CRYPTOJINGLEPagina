const mongoose = require('mongoose');

const  userSchema = mongoose.Schema({
    id :{
        type: String,
        required: true
    },
    name :{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    clavePublica :{
        type: String,
        required: true
    },
    clavePrivada :{
        type: String,
        required: true
    },
    codigoCorreo :{
        type: String,
        required: true
    },
});

module.exports = mongoose.model('User', userSchema);