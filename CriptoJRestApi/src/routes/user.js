const express = require('express');
const userSchema =  require('../models/user');

const router = express.Router();
const OAuth = require('oauth');
const nodemailer = require('nodemailer');

const consumerKey = '1670996871802761216-nIJ7l2RkedcbcbDrHcgWVYeGXBdsfH';
const consumerSecret = 'oDIZ2KYpzTIZOoHxZkiEhvoRiS08xbzZkN186s7XJ3fpo';

//npm install nodemailer
//npm i guid

// create user
router.post('/users', (req, res) => {

    const  user = userSchema(req.body);
    console.log(user.email);
    const crypto = require('crypto');
    console.log(crypto.randomUUID());
    let string = crypto.randomUUID().split("-");
    let llave = string[2];
    let email = user.email;
    user.codigoCorreo =  llave;
        console.log('Enviandoa:');
        console.log(email);
        var message = {
            from: "jeomar.rl@gmail.com",
            to: email,
            subject: "Verificación de correo",
            text: "Código: "+ llave,
            html: "<p>Código: "+ llave+"</p>"
        };
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'jeomar.rl@gmail.com',
            pass: 'ndbaclcneeuqwwnq'
            }
        });
    
        transporter.sendMail(message, (error, info) => {
            if (error) {
                console.log("Error enviando email")
                console.log(error.message)
            } else {
                console.log("Email enviado")
            }
        })

   
    user.save()
    .then((data) => res.json(data))
    .catch((error)=> res.json({ message: error}));
});

// get all users
router.get('/users', (req, res) => {
    console.log('lectura');
    userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error)=> res.json({ message: error}));
});

// get a user
router.get('/users/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    
    userSchema
    .findOne({id: id})
    .then((data) => res.json(data))
    .catch((error)=> res.json({ message: error}));
});


// get a user
router.get('/users/:email/:password', (req, res) => {
    const { email, password} = req.params;
    userSchema
    .findOne({email: email,password:password })
    .then((data) => res.json(data))
    .catch((error)=> res.json({ message: error}));
});

// update a user
router.put('/users/:_id', (req, res) => {
    const { _id } = req.params;
    console.log(_id);
    const { name, email, password, clavePublica, clavePrivada, id} = req.body;
    userSchema
    .updateOne({_id: _id}, { $set:{ id, name, email, password, clavePublica, clavePrivada}}  )
    .then((data) => res.json(data))
    .catch((error)=> res.json({ message: error}));
});


// enviar a correo
router.get('/users/:email/:password/:id', (req, res) => {
    const crypto = require('crypto');
console.log(crypto.randomUUID());
let string = crypto.randomUUID().split("-");
let llave = string[2];
console.log(llave);
    const { email, password,id } = req.params;
    console.log('Enviandoa:');
    console.log(email);
    var message = {
        from: "jeomar.rl@gmail.com",
        to: email,
        subject: "Verificación de correo",
        text: "Código: "+ llave,
        html: "<p>Código: "+ llave+"</p>"
    };
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'jeomar.rl@gmail.com',
        pass: 'ndbaclcneeuqwwnq'
        }
    });

    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log("Error enviando email")
            console.log(error.message)
        } else {
            console.log("Email enviado")
        }
    })
    // const { name, email, password, clavePublica, clavePrivada, id} = req.body;
    // userSchema
    // .updateOne({_id: _id}, { $set:{ id, name, email, password, clavePublica, clavePrivada}}  )
    // .then((data) => res.json(data))
    // .catch((error)=> res.json({ message: error}));
});


// delete a user
router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    userSchema
    .findOneAndRemove({_id: id})
    .then((data) => res.json(data))
    .catch((error)=> res.json({ message: error}));
});



const oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    consumerKey,
    consumerSecret,
    '1.0A',
    null,
    'HMAC-SHA1'
  );
  
  router.post('/request_token', (req, res) => {
    oauth.getOAuthRequestToken((error, oauthToken, oauthTokenSecret) => {
      if (error) {
        console.error('Request token error:', error);
        return res.status(500).json({ error: 'Failed to get request token.' });
      }
  
      res.json({ oauth_token: oauthToken, oauth_token_secret: oauthTokenSecret });
    });
  });
  
  router.post('/login', (req, res) => {
    const { oauth_token, oauth_token_secret } = req.body;
  
    oauth.getOAuthAccessToken(
      oauth_token,
      oauth_token_secret,
      req.body.oauth_verifier,
      (error, oauthAccessToken, oauthAccessTokenSecret) => {
        if (error) {
          console.error('Access token error:', error);
          return res.status(500).json({ error: 'Failed to get access token.' });
        }
  
        // Make API calls with the obtained access token if needed
        // Return the user data and access token to the client
        res.json({ access_token: oauthAccessToken, access_token_secret: oauthAccessTokenSecret });
      }
    );
  });
module.exports = router;