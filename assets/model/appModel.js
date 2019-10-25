'use strict';
const sql = require('./db');
const config = require('../config');
let Booster = class {
  constructor(booster_name, booster_dose, boosterdesc, booster_date) {
    this.booster_name = booster_name;
    this.booster_dose = booster_dose;
    this.boosterdesc = boosterdesc;
    this.booster_date = booster_date.substring(0, 10);
  }
  static getAllBooster(result) {
    sql.query('SELECT * FROM booster', function(err, res) {
      if (err) {
        console.log('error: ', err);
        result(null, err);
      } else {
        console.log('Number of lines ' + res.length + ' rows');
        result(null, res);
      }
    });
  }
  static DeleteBoosterById(idbooster, result) {
    sql.query(
      'Select * from booster where idbooster = ?',
      [idbooster],
      function(err, res) {
        if (err || res[0] == undefined) {
          console.log('error :: not in the database : ');
          result(null, err);
        } else {
          sql.query(
            'Delete from booster where idbooster = ? ',
            [idbooster],
            function(err, res) {
              if (err) {
                console.log('error: ', err);
                result(null, err);
              } else {
                console.log('deleted ' + res.affectedRows + ' rows');
                result(null, res);
              }
            }
          );
        }
      }
    );
  }
  static UpdateBoosterById(idbooster, update_boost, result) {
    sql.query(
      'Select * from booster where idbooster = ?',
      [idbooster],
      function(err, res) {
        if (res[0] != undefined) {
          sql.query(
            'Select * from booster where idbooster != ? AND booster_name = ?',
            [idbooster, update_boost.booster_name],
            function(err, res) {
              if (res[0] != undefined) {
                console.log('Name already taken ');
                result(null, err);
              } else {
                sql.query(
                  'Update booster SET booster_name= ?, booster_dose = ?, boosterdesc=?, booster_date=? where idbooster = ? ',
                  [
                    update_boost.booster_name,
                    update_boost.booster_dose,
                    update_boost.boosterdesc,
                    update_boost.booster_date,
                    idbooster
                  ],
                  function(err, res) {
                    if (err) {
                      console.log('error: ', err);
                      result(null, err);
                    } else {
                      console.log(
                        'update ok changed ' + res.changedRows + ' rows'
                      );
                      result(null, res);
                    }
                  }
                );
              }
            }
          );
        } else {
          console.log('error: ', err);
          result(null, res);
        }
      }
    );
  }
  static getBoosterById(idbooster, result) {
    sql.query(
      'Select * from booster where idbooster = ? ',
      [idbooster],
      function(err, res) {
        if (err) {
          console.log('error: ', err);
          result(null, err);
        } else {
          console.log('ok');
          result(null, res);
        }
      }
    );
  }
  static insertBooster(new_boost, result) {
    sql.query(
      'Select * from booster where booster_name = ?',
      [new_boost.booster_name],
      function(err, res) {
        if (err || res[0] != undefined) {
          console.log('error :: name already taken : ' + res[0].booster_name);
          result(null, err);
        } else {
          sql.query('INSERT INTO booster SET ?', new_boost, function(err, res) {
            if (err) {
              console.log('error: ', err);
              result(null, err);
            } else {
              console.log('last insert id : ' + res.insertId);
              result(null, res);
            }
          });
        }
      }
    );
  }
};
module.exports = Booster;
