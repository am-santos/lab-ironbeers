const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (request, response) => {
  punkAPI
    .getBeers()
    .then(arrayOfBeers => {
      console.log('getBeers is working');
      response.render('beers', { beer: arrayOfBeers });
    })
    .catch(error => {
      console.log('error on the getBeers method');
      console.log(error);
    });
});

app.get('/random-beer', (request, response) => {
  punkAPI
    .getRandom()
    .then(randomBeer => {
      console.log('getRandom is working');
      response.render('random-beer', { beer: randomBeer[0] });
    })
    .catch(error => {
      console.log('error on the getRandom method');
      console.log(error);
    });
});

app.get('/beers/:id', (request, response) => {
  const id = request.params.id;
  punkAPI
    .getBeer(id)
    .then(beer => {
      console.log('getBeer is working');
      response.render('singleBeer', { beer: beer[0] });
    })
    .catch(error => {
      console.log('error on the getBeer method');
      console.log(error);
    });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
