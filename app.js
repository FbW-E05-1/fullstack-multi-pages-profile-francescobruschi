const { log } = require('console');
const express = require('express');
require('dotenv').config();
const path = require('path');
const emailDataSender = require('./Models/emailSender');
const logger = require('morgan');

const Home = require('./routes/home');
const About = require('./routes/about');
const Contact = require('./routes/contact');
const Service = require('./routes/service');

const app = express();
const port = process.env.PORT || 3001;

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// set public folder
app.use(express.static(path.join(__dirname, 'public')));
// set view engine
app.set('view engine', 'ejs');
app.set('views', 'views');
// set use logger
app.use(logger('dev'));
// set variables
// app.set('port', process.env.PORT || 3001);

// routes
app.use('/', Home);
app.use('/about', About);
app.use('/contact', Contact);
app.use('/service', Service);



app.get('/', ( req, res)=>{
  res.render('index');  // render index.ejs
})
app.get('/about', ( req, res)=>{
  res.render('about');  
})
app.get('/contact', ( req, res)=>{
  res.render('contact'); 
})
app.get('/document', ( req, res)=>{
  res.render('document'); 
})
app.get('/hire-us', ( req, res)=>{
  res.render('hire-us');  
})
app.get('/service', ( req, res)=>{
  res.render('service'); 
})

app.post('/contact', (req, res)=>{
  console.log(req.body);
emailDataSender.sendMail(req.body).then(info =>{
res.json({result: 'done'});
}).catch(err =>{
  res.json({result: 'error'})
})
} )
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
} );




