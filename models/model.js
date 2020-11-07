/***********************************************************************************
 * Purpose      : Following Programs defines Schema
 * @file        : model.js
 * @overview    : Check whether connected to local host or not
 * @module      : 1. Express    2. mongoose     3. mongodb      4. body-parser
 * @author      : Saurabh Dagwar
 * @version     : 14.14.0
 * @since       : 05/11/2020
 *************************************************************************************/

const mongoose = require("mongoose");
const joi = require('joi');

//Defined Schema to send data in JSON format
const GreetingSchema = mongoose.Schema(
  {
    name: joi.string().min(5).max(20).required(),
    message: joi.string().min(5).optional(),
  },
  {
    timestamps: true,
  }
);
let Schema = mongoose.model("Greeting", GreetingSchema);


class model {
  //pushData Save Greeting Data on Database
  pushData = (data, callback) => {
    const schema = new Schema({
      name: data.name,
      message: data.message,
    });
    schema
      .save()
      .then((data) => {
        callback(null, data);
      })
      .catch((err) => {
        callback(err, null);
      });
  };

//getData method retrive all data from database
  getData = (callback) => {
    Schema.find(function (err, greeting) {
      if (err) {
        return callback(err, null);
      }
      return callback(null, greeting);
    });
  };

//putData method update data according with ID from database
  putData = (greetingId, data, callback) => {
    mongoose.set("useFindAndModify", false);
    Schema.findByIdAndUpdate(greetingId, data, function (err) {
      if (err) {
        return callback(err, null);
      }
      return callback(null, data);
    });
  };

//deleteData method delete data according with ID
  deleteData = (greetingId, callback) => {
    mongoose.set("useFindAndModify", false);
    Schema.findByIdAndRemove(greetingId, function (err) {
      if (err) {
        return callback(err);
      }
      return callback(null);
    });
  };
}

module.exports = new model();
