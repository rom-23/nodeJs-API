const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan')('dev');
const twig = require('twig');
const app = express();
const axios = require('axios');
const port = 8080;

const fetch = axios.create({
  baseURL: 'http://localhost:8081/api/v2/'
});

// Middlewares
app.use(morgan);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.redirect('/boosters');
});
app.get('/boosters', function(req, res) {
  apiCall('/booster', 'get', {}, res, result => {
    res.render('boosters.twig', {
      boosters: result
    });
  });
});
// Page récupérant un booster en fonction de son ID
app.get('/boosters/:idbooster', (req, res) => {
  apiCall('/booster/' + req.params.idbooster, 'get', {}, res, result => {
    res.render('booster.twig', {
      booster: result
    });
  });
});

// Page gérant l'ajout d'un booster
app.get('/insert', (req, res) => {
  res.render('insert.twig');
});

// Méthode permettant d'ajouter un booster
app.post('/insert', (req, res) => {
  apiCall(
    '/booster/create/',
    'post',
    {
      booster_name: req.body.booster_name,
      booster_dose: req.body.booster_dose,
      boosterdesc: req.body.boosterdesc,
      booster_date: req.body.booster_date
    },
    res,
    () => {
      res.redirect('/boosters');
    }
  );
});
// Méthode permettant de supprimer un booster
app.post('/delete', (req, res) => {
  apiCall('/booster/delete/' + req.body.idbooster, 'delete', {}, res, () => {
    res.redirect('/boosters');
  });
});

// Page gérant la modification d'un booster
app.get('/edit/:idbooster', (req, res) => {
  apiCall('/booster/' + req.params.idbooster, 'get', {}, res, result => {
    res.render('edit.twig', {
      booster: result
    });
  });
});

// Méthode permettant de modifier un booster
app.post('/edit/:idbooster', (req, res) => {
  apiCall(
    '/booster/update/' + req.params.idbooster,
    'put',
    {
      booster_name: req.body.booster_name,
      booster_dose: req.body.booster_dose,
      boosterdesc: req.body.boosterdesc,
      booster_date: req.body.booster_date
    },
    res,
    () => {
      res.redirect('/boosters');
    }
  );
});

// Lanuch app
app.listen(port, () => console.log('Front App Started on port ' + port));

// functions
function renderError(res, errMsg) {
  res.render('error.twig', {
    errorMsg: errMsg
  });
}

function apiCall(url, method, data, res, next) {
  fetch({
    method: method,
    url: url,
    data: data
  })
    .then(response => {
      if (response.data.status == 'success') {
        next(response.data.result);
      } else {
        renderError(res, response.data.error);
      }
    })
    .catch(err => renderError(res, err.error));
}
