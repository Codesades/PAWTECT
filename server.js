const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const app = express();
const path = require('path');

// Middleware
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//EJS config 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const mainRoutes = require('./routes/main.routes.js');
app.use('/', mainRoutes);

// Start the server 
const PORT = process.env.PORT || 3000;
app.listen(PORT,() =>{
    console.log(`Server is running on http://localhost:${PORT}`);
});