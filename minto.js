const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const bcrpyt = require('bcryptjs');

const app = express();



//mongodb configuration

//middleware bodyparser

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
const db = require('./setup/myurl').mongoURL

//attempt to connect to db

mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log('connected successfully..'))
    .catch(err => console.log(err));

const port = process.env.PORT || 3000;

//app.get('/', (req, res)=>{
//    res.send('im here');
//});

app.set('views', './public');
app.set('view engine', 'ejs');

app.get('/', (req, res) =>{
    res.render('register');
});

app.get('/login', (req, res) =>{
    res.render('login');
});
const Person = require('./models/Person');

app.post('/logging', (req, res) =>{
    var email = req.body.email;
    var password = req.body.password;


//password comparision
    const myperson = Person.findOne({email});
    if(myperson){
        if(Person.password == myperson.password){
            res.send('login successful..');
        }
        else{
            res.send('check the pass');
        }
    }
});
    
//    Person.findOne({email})
//        .then(person =>{
//        if(!person){
//            return res.status(404).json({emailerror:' user not found'});
//        }
//       else if(password == person.password){
//           res.status(200).json({success: 'user logged in'});
//       }
////        else{
////            res.json({unsuccessful: 'password error'});
////        }
//    })
//        .catch(err => console.log(err));
//});

app.post('/registration', (req, res) =>{
    Person.findOne({
        email: req.body.email
    }).then(person => {
        if(person){
            return res.status(400).json({emailerror:'email is already registered'})
        }else{
            const newperson = new Person({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password 
            });
//            //to encrypt password using bcrypt js
//            bcrypt.genSalt(10, (err, salt) =>{
//                bcrypt.hash(newperson.password, salt, (err, hash) =>{
//                    if(err) throw err;
                   // newperson.password = hash;
                    newperson.save()
                        .then(person => res.json(person))
                        .catch(err => console.log(err));
//                })
//            })
        }
    })
    .catch(err => console.log(err));
});


//actual routes
//app.use('/api/auth', auth);
//app.use('/api/question', question);
//app.use('/api/profile', profile);

//app.use('/static', express.static('public'));
app.listen(port)