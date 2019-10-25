'use strict';
var express = require('express');
var router = express.Router();
const config = require('../config');
var booster = require('../controller/appController');

// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log('--- Middleware work --- : Time: ', Date.now());
//   next();
// });

// define the home page route
router.get(config.rootAPI, function(req, res) {
  res.redirect(config.rootAPI + 'booster');
});
router.get(config.rootAPI + 'booster', booster.AllBooster);
router.get(config.rootAPI + 'booster/:idbooster', booster.BoosterById);
router.post(config.rootAPI + 'booster/create', booster.InsertBooster);
router.delete(
  config.rootAPI + 'booster/delete/:idbooster',
  booster.DeleteBooster
);
router.put(config.rootAPI + 'booster/update/:idbooster', booster.UpdateBooster);
module.exports = router;
