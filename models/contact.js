const mongoose = require('mongoose');
const { Schema } = mongoose;
const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    phone: {
        type:String, 
        required: true
    }
});

//collection name should be capital 
const Contact = mongoose.model('Contact' , contactSchema); 

module.exports = Contact ; 