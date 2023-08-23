const express = require('express');
const userSchema = require('../models/user');
const { Resend } = require('resend');
const router = express.Router();
const OAuth = require('oauth');
const nodemailer = require('nodemailer');

const consumerKey = '1670996871802761216-nIJ7l2RkedcbcbDrHcgWVYeGXBdsfH';
const consumerSecret = 'oDIZ2KYpzTIZOoHxZkiEhvoRiS08xbzZkN186s7XJ3fpo';
const RESEND_API_KEY ='re_XvquHURP_7u87RrT9MSbeh8kroYgK3s7Q';



const resend = new Resend(RESEND_API_KEY);
const url_api = 'http://18.189.33.125/';
const url_sitio = 'http://3.16.100.189:3000/';
//import { Resend } from 'resend';

//npm install nodemailer
//npm i guid

// create user
router.post('/users', (req, res) => {

  const user = userSchema(req.body);
  console.log("insertar");
  console.log(user.email);
  user.name = user.name.toUpperCase();
  user.id = user.id.toUpperCase();
  user.validado = 'No';
  user.email = user.email.toLowerCase();
  const crypto = require('crypto');
  console.log(crypto.randomUUID());
  let string = crypto.randomUUID().split("-");
  let llave = string[2];
  let email = user.email;
  user.codigoCorreo = llave;
  console.log('Enviandoa:');
  console.log(email);


  let htmlContent = `<!DOCTYPE html>
  <html>
  <head>
  
      <title>Confirmación de Correo Electrónico</title>
      <style>
          body { 
              font-family: Arial, sans-serif; 
              background-color: #f4f4f4;
          }
          .container {
              width: 80%;
              max-width: 600px;
              margin: auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
              overflow: hidden;
              margin-top: 10%;
          }
          a {
              display: inline-block;
              text-decoration: none;
              color: #fefa00;
              background-color: #007BFF;
              padding: 10px 15px;
              border-radius: 5px;
              margin-top: 20px;
          }
          h2 {
              color: #007BFF;
              padding: 10px;
              border: 1px solid #007BFF;
              border-radius: 5px;
              text-shadow: 1px 1px #999;
              text-align: center;
          }
          p {
              color: #333;
              line-height: 1.5;
          }
      </style>
  </head>
  <body   >
      <div class="container">
          <h2>Confirmación de Correo Electrónico</h2>
          <p>¡Hola! ~USUARIO~ Gracias por registrarte en Cryptojinglers.
               Para completar el proceso de registro y ser un Jingler 
               por favor confirma tu dirección de correo electrónico haciendo clic en el botón de abajo:</p>
          <a href="~URL_CONFIRMACION~">Confirmar Correo Electrónico</a>
  
          <p>Si no has solicitado esta confirmación, solo ignora este Correo.</p>
          <p>Recuerda que Cryptojingle nunca te pedira informacion personal, claves,
              o alguna frase semilla. Nunca nos pondremos en contacto directamente a menos que 
              generes un ticket.  
          </p>
          <p>Disfruta de esta increible comunidad. Saludos cordiales.</p>
          <p>We are Cryptojingle</p>
      </div>
  </body>
  </html>
  
  `;
htmlContent = htmlContent.replace('~URL_CONFIRMACION~', url_api +"api/validacion/" + user.id + "/" + user._id).replace('~USUARIO~',user.id);
try {
  const data =  resend.emails.send({
    from: 'Jingles <onboarding@resend.dev>',
    to: [email],
    subject: "Verificación de correo",
    html: htmlContent,
  });
  //res.status(200).json({ data });
} catch (error) {
  res.status(500).json({ error });
}  


  // (async function () {
  //   try {
  //     const data = await resend.emails.send({
  //       from: 'Jingles <onboarding@resend.dev>',
  //       to: '['+email+']',
  //       subject: "Verificación de correo",
  //       html: htmlContent,
  //     });
  
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // })();

// var message = {
  //   from: "jeomar.rl@gmail.com",
  //   to: email,
  //   subject: "Verificación de correo",
  //   text: "Código: " + llave,
  //   html: "<p>link: http://localhost:9000/api/validacion/" + user.id + "/" + user._id + "</p>"
  // };
  // var transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: 'jeomar.rl@gmail.com',
  //     pass: 'ndbaclcneeuqwwnq'
  //   }
  // });

  // transporter.sendMail(message, (error, info) => {
  //   if (error) {
  //     console.log("Error enviando email")
  //     console.log(error.message)
  //   } else {
  //     console.log("Email enviado")
  //   }
  // });

  

  
  console.log(user);
  user.save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all users
router.get('/users', (req, res) => {
  console.log('lectura');
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get a user
router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);

  userSchema
    .findOne({ id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get a user
router.get('/users_por_id/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);

  userSchema
    .findOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});


// get a user
router.get('/users/:email/:password', (req, res) => {
  const { email, password } = req.params;
  userSchema
    .findOne({ email: email.toLocaleLowerCase(), password: password })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update a user
router.put('/users/:_id', (req, res) => {
  const { _id } = req.params;
  console.log(_id);
  const { name, email, password, clave, tipo, id } = req.body;
  userSchema
    .updateOne({ _id: _id }, { $set: { id, name, email, password, clave, tipo } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});


// enviar a correo
router.get('/users/:email/:password/:id', (req, res) => {


  const crypto = require('crypto');
  console.log(crypto.randomUUID());
  let string = crypto.randomUUID().split("-");
  let llave = string[2];
  console.log(llave);
  const { email, password, id } = req.params;
  console.log('Enviandoa:');
  console.log(email);
  var message = {
    from: "jeomar.rl@gmail.com",
    to: email.toLowerCase(),
    subject: "Verificación de correo",
    text: "Código: " + llave,
    html: "<p>Código: " + llave + "</p>"
  };
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jeomar.rl@gmail.com',
      pass: 'rcuapefnnmjulfiu'
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
    .findOneAndRemove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
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


router.get('/validacion/:email/:id', (req, res) => {

  const { id, email } = req.params;
  console.log(req.params);
  let _validado = 'Si';

  let htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
  <script type="text/javascript">
  function  alerta(){
   setTimeout(() => {
    window.location.replace("~URL_SITIO~");
   }, 5000);
  }
   </script>
      <title>Estas a solo un paso de ser un JINGLER!</title>
      <style>
          body { 
              font-family: Arial, sans-serif; 
              background-color: #f4f4f4;
          }
          .container {
              width: 80%;
              max-width: 600px;
              margin: auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
              overflow: hidden;
              margin-top: 10%;
          }
          a {
              display: inline-block;
              text-decoration: none;
              color: #fff;
              background-color: #007BFF;
              padding: 10px 15px;
              border-radius: 5px;
              margin-top: 20px;
          }
          h2 {
              color: #007BFF;
              padding: 10px;
              border: 1px solid #007BFF;
              border-radius: 5px;
              text-shadow: 1px 1px #999;
              text-align: center;
          }
          p {
              color: #333;
              line-height: 1.5;
          }
      </style>
  </head>
  <body onload="alerta()">
      <div class="container">
          <h2>Tu correo fue Verificado</h2>
          <p>¡Hola! ~USUARIO~ 
              Tu correo electrónico ha sido verificado con éxito. 
              Serás redirigido a nuestro sitio web en un máximo de 5 segundos.</p>
          <p>Si esto no sucede, por favor haz clic en el botón de abajo:</p>
          <a href="~URL_SITIO_2~">Cryptojingle Web</a>
          <p>~USUARIO_2~ Gracias por confirmar tu correo electrónico.</p>
          <p>Te esperamos activo en la comunidad</p>
          <p>Cryptojingle te desea lo mejor!</p>
      </div>
  </body>
  </html>
  `;
  console.log(id);
  userSchema
    .updateOne({ _id: id }, { $set: { validado: _validado } })
    .then((data) => {
      htmlContent = htmlContent.replace('~USUARIO~', email).replace('~USUARIO_2~', email).replace('~URL_SITIO~',url_sitio).replace('~URL_SITIO_2~',url_sitio);
      res.send(htmlContent);
      // if (data.modifiedCount > 0) {
      //   htmlContent = htmlContent.replace('~USUARIO~', email).replace('~USUARIO_2~', email).replace('~URL_SITIO~',url_sitio).replace('~URL_SITIO_2~',url_sitio);
      //   res.send(htmlContent);
      // } else {
      //   htmlContent = `
      //   <html>
      //     <head>
      //       <title>Crypto Jingles</title>
      //     </head>
      //     <body>
      //       <h1>Correo no fue validado</h1>
      //     </body>
      //   </html>
      // `;
      //   res.send(htmlContent);
      // }
    })
    .catch((error) => {
      res.json({ message: 'Error en validación de correo' });
      console.log('errr:' + error)
    });
  console.log('validación:');
  console.log(email);



  //res.sendfile(path.resolve(_dirname, 'pagina.html'))
});

module.exports = router;