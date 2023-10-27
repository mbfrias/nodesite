const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const secureport = 443;
const insecureport = 80;
const dotenv = require('dotenv').config();
const fs = require('fs');
const http = require('http');
const https = require('https');
if (process.env.WEBHOST_SERVER == 'local') {
  var https_options = {
    key: fs.readFileSync('./certs/banksymac.local+7-key.pem'),
    cert: fs.readFileSync('./certs/banksymac.local+7.pem')
  }
}


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/londontransit', (req, res) => {
  res.status(307).appendHeader('Location', 'https://londontransit.org.uk')
});

app.get('/coffee', (req, res) => {
    res.status(418).sendFile(__dirname + '/public/418.html');
});

app.get('/teapot', (req, res) => {
  res.redirect(308, './coffee');
})

app.get('/contact/sendform', (req, res) => {
  res.status(405).appendHeader('Allow', 'POST').sendFile(__dirname + '/public/405.html');
});

app.post('/contact/sendform', (req, res) => {
  // check if the form is filled out
  if (!req.body.name || !req.body.email || !req.body.subject || !req.body.message) {
    // spit out a 400 error and redirect the client to an error page
    return res.status(400).sendFile(__dirname + '/public/400_empty.html');
  }
  // check if the email is valid
  if (!req.body.email.includes('@')) {
    // spit out a 400 error and redirect the client to an error page
    return res.status(400).sendFile(__dirname + '/public/400_wrongmail.html');
  }
  // FORBID MESSAGES FROM "DENISBERGER.WEB@GMAIL.COM"
  if (req.body.email.includes('denisberger.web@gmail.com')) {
    // spit out a 403 error and redirect the client to an error page
    return res.status(403).sendFile(__dirname + '/public/403_spammail.html');
  }

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
      from: 'Contact Form <webform@mbfrias.me.uk>',
      replyTo: `${req.body.email}`,
      to: process.env.DESTINATION_EMAIL,
      subject: `Message from ${req.body.name}`,
      text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nSubject: ${req.body.subject}\nMessage: ${req.body.message}`
    }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {  
      // spit out a 500 error and redirect the client to an error page
      console.error(error);
      res.status(500).sendFile(__dirname + '/public/500_mailer.html');
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

if (process.env.WEBHOST_SERVER == 'local') {
  https.createServer(https_options, app).listen(secureport, () => {
    console.log('main server configured for secure connections on port 443');
  });
  http.createServer((req, res) => {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
  }).listen(insecureport, () => {
    console.log('alternate server configured on port 80 to redirect insecure connections to secure server');
  });
} else if (process.env.WEBHOST_SERVER == 'digitalocean') {
  app.listen(secureport, () => {
    console.log('server configured for secure connections on port 443');
  });
} else {
  console.log('Error: WEBHOST_SERVER environment variable not set: returning 503 error to all requests');
  app.use((req, res, next) => {
    res.status(503).sendFile(__dirname + '/public/503.html');
  });
}