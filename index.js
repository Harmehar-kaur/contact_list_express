const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


var contactList = [
    {
        name: "Arpan",
        phone: "1111111111"
    },
    {
        name: "Tony Stark",
        phone: "1234567890"
    },
    {
        name: "Coding Ninjas",
        phone: "12131321321"
    }
]

app.get('/practice', function(req, res){
    return res.render('practice', {
        title: "Let us play with ejs"
    });
});


app.get('/', async function (req, res) {
    try {
        const contacts = await Contact.find({}).exec();
        res.render('home', {
            title: "Contact List",
            contact_list: contacts
        });
    } catch (err) {
        console.log("error in fetching contacts from db", err);
    }
});

app.post('/create-contact', async function (req, res) {
    try {
        const newContact = await Contact.create({
            name: req.body.name,
            phone: req.body.phone
        });
        console.log('******', newContact);
        res.redirect('back');
    } catch (err) {
        console.log('Error in creating a contact!', err);
        return res.redirect('back');
    }
});


app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})


app.get('/delete-contact/', async function (req, res) {
    console.log(req.query);
    let id = req.query.id;

    try {
        await Contact.findOneAndDelete({ _id: id }).exec();
        res.redirect('back');
    } catch (err) {
        console.log('Error in deleting the object', err);
        return res.redirect('back');
    }
});

