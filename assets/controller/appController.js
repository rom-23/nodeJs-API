'use strict';
var Booster = require('../model/appModel.js');
const { checkAndChange } = require('../functions');

exports.AllBooster = function(req, res) {
  Booster.getAllBooster(function(err, booster) {
    if (err) res.send(err);
    res.send(checkAndChange(booster));
  });
};
exports.DeleteBooster = function(req, res) {
  Booster.DeleteBoosterById(req.params.idbooster, function(err, booster) {
    if (req.params.idbooster === '0' || !booster) {
      res.json({ error: ' Id Not valid for removal' });
      console.log('Id Not valid for removal');
    } else {
      res.json(checkAndChange(booster));
      console.log('--- > Id deleted done :' + req.params.idbooster);
    }
  });
};
exports.UpdateBooster = function(req, res) {
  let update_boost = new Booster(
    req.body.booster_name,
    req.body.booster_dose,
    req.body.boosterdesc,
    req.body.booster_date.substring(0, 10)
  );
  Booster.UpdateBoosterById(req.params.idbooster, update_boost, function(
    err,
    booster
  ) {
    if (err || !booster) {
      res.json({ error: ' This name already used' });
      console.log('-- > Error with update : ' + req.params.idbooster);
    } else {
      res.json(checkAndChange(booster));
      console.log('-- > Update done for id : ' + req.params.idbooster);
    }
  });
};
exports.BoosterById = function(req, res) {
  Booster.getBoosterById(req.params.idbooster, function(err, booster) {
    if (req.params.idbooster === '0' || booster[0] === undefined) {
      res.json({ error: ' : Error with a wrong id ' });
      console.log('error with the id');
    } else {
      res.json(checkAndChange(booster));
    }
  });
};
exports.InsertBooster = function(req, res) {
  let new_boost = new Booster(
    req.body.booster_name,
    req.body.booster_dose,
    req.body.boosterdesc,
    req.body.booster_date
  );
  Booster.insertBooster(new_boost, function(err, booster) {
    if (err || !booster) {
      res.json({ error: '  Name already taken ' });
    } else {
      res.json(checkAndChange(booster));
      console.log('-- > Insert in database done ');
    }
  });
};
