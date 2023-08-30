const express =  require('express');
const mongoose = require('mongoose');
const router = express.Router();
require('dotenv').config();
const userRoutes = require('./routes/user');

const app = express();
const axios = require("axios");

const port = process.env.PORT || 9000;
//npm i express axios dotenv --save

// middleware
const cors = require('cors');
app.use(cors({
    origin: '*'
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRoutes);


//add router in express app
app.use("/", router);

// routes
app.get('/', (req, res)=>{
    res.send('Welcome to my API');
});

// mongodb connection
mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log('Connected to MongoDB Atlas'))
.catch((error) => console.error('error'));

//POST route
router.post("/post", async (req, res) => {

    ////Destructuring response token and input field value from request body
    const { token, inputVal } = req.body;
  
    try {
      // Sending secret key and response token to Google Recaptcha API for authentication.
      const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`
      );
  
      // Check response status and send back to the client-side
      if (response.data.success) {
        res.send("Human 👨 👩");
      } else {
        res.send("Robot 🤖");
      }
    } catch (error) {
      // Handle any errors that occur during the reCAPTCHA verification process
      console.error(error);
      res.status(500).send("Error verifying reCAPTCHA");
     }
  });


  // router.post("/post", async (req, res) => {

  //   ////Destructuring response token and input field value from request body
  //   const { token, inputVal } = req.body;
  
  //   try {
  //     // Sending secret key and response token to Google Recaptcha API for authentication.
  //     const response = await axios.post(
  //       `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`
  //     );
  
  //     // Check response status and send back to the client-side
  //     if (response.data.success) {
  //       res.send("Human 👨 👩");
  //     } else {
  //       res.send("Robot 🤖");
  //     }
  //   } catch (error) {
  //     // Handle any errors that occur during the reCAPTCHA verification process
  //     console.error(error);
  //     res.status(500).send("Error verifying reCAPTCHA");
  //    }
  // });
app.listen(port, ()=> console.log('server listening on port', port));
