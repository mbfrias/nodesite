const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const port = 80;
const dotenv = require('dotenv').config();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/teapot', (req, res) => {
    res.status(418).send('I\'m a teapot');
});

app.post('/sendform', (req, res) => {
    let transporter = nodemailer.createTransport({
      host: "mail.spacemail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    })
  
    let mailOptions = {
      from: '"Contact Form" <webform@mbfrias.me.uk>',
      to: process.env.DESTINATION_EMAIL,
      subject: 'HEY GUESS WHAT: NEW FORM SUBMISSION',
      text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nSubject: ${req.body.subject}\nMessage: ${req.body.message}`
    }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {  
      // spit out a 500 error and redirect the client to an error page
      console.log(error);
      res.status(500).send('Error sending email');
      return; 
    }
    console.log('Message sent');
    res.send(
      '<script>alert("Form submitted successfully!"); window.history.back();</script>'
    );
  })
});

app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + '/public/404.html');
});



app.listen(port, () => {
  console.log(`web server active on port ${port}`);
});