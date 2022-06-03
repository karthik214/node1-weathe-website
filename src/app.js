//Libraries
const express = require('express');
const path = require('path');
const hbs = require('hbs');

//Functions
const geocode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast');

const app = express();

// Define paths for Express config 
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

//Tab routers
app.get('', (req, res) => {
    res.render('index',{
            title: 'Weather',
            name: '© Karthik Shasthri'
        });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: '© Karthik Shasthri'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        name: '© Karthik Shasthri',
        title: 'Help'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error:'Please enter the location'});
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(longitude, latitude, (error, result) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: result,
                location,
                address:req.query.address
            });
        });
    });
});

//Error router
app.get('/help/*', (req, res) => {
    res.render('404Error', {
        title: '404',
        name: 'Karthik Shastri',
        errorMessage:'Help Article not found'
    });
});

// 404 Not Found Error
app.get('*', (req, res) => {
    res.render('404Error', {
        title: '404',
        name: 'Karthik Shastri',
        errorMessage:'Page not found'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});

// Old code

// app.get('/help', (req, res) => {
//     res.send([
//         {
//         name: 'Karthik',
//         age: 26
//         },
//         {
//             name: 'Shasthri',
//             age: 26
//         }
//     ]);
// });

// app.get('/about', (req, res) => {
//     res.send('<h1>About page</h1>');
// });

// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error:'You must provide a search term'
//         });
//     }
//     console.log(req.query.search);
//     res.send({
//         products: []
//     });
// });