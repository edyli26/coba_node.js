const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const app =express();
const port = 3000;


// init middelware
// app.use(logger);

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended:false}));


// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// members API Routes
app.use('/api/members', require('./routes/api/members'));


app.listen(port,function(){
    console.log('Listening on port', port);
});


