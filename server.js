const express=require('express')
const connectDB=require('./config/DB')

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const app = express()

process.on('uncaughtException', (error) => {
    // using uncaughtException event
    console.log(' uncaught Exception => shutting down..... ');
    console.log(error.name, error.message);
    process.exit(1); //  emidiatly exists all from all the requests
});

// Connnect Database 
connectDB() 

// init Middleware
app.use(express.json({extended:false}))

app.get('/', (req, res) =>{
    res.send('Api running ')
})

// set security http headers
app.use(helmet());

//  set limit request from same API
const limiter = rateLimit({
    max: 100, //   max number of limits
    windowMs: 60 * 60 * 1000, // hour
    message: ' Too many req from this IP , please Try  again in an Hour ! ',
  });
app.use('/api', limiter);

//  Body Parser  => reading data from body into req.body protect from scraping etc
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSql query injection
app.use(mongoSanitize()); //   filter out the dollar signs protect from  query injection attact

// Data sanitization against XSS
app.use(xss()); //    protect from molision code coming from html

// Define Routes 
app.use('/api/users',require('./routes/api/user'))
app.use('/api/auth',require('./routes/api/auth'))
app.use('/api/profile',require('./routes/api/profile'))
app.use('/api/posts',require('./routes/api/posts'))


const PORT=process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log('Server running on Port => ',PORT)
})

// handle the unhandle rejection outside the express
process.on('unhandledRejection', (error) => {
    // using unhandledRejection event
    console.log(' Unhandled Rejection => shutting down..... ');
    console.log(error.name, error.message);
    server.close(() => {
      process.exit(1); //  emidiatly exists all from all the requests
    });
});   