require('dotenv').config();
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT;

// Handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

// Middlewares

// Servir contenido estatico
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('home',{
        name: 'Christian Osorio',
        title: 'Curso Node'
    });
});

app.get('/generic', function (req, res) {
    res.render('generic',{
        name: 'Christian Osorio',
        title: 'Curso Node'
    });
});

app.get('/elements', function (req, res) {
    res.render('elements',{
        name: 'Christian Osorio',
        title: 'Curso Node'
    });
});

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/template/404.html');
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});