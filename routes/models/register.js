'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;


/**
 * User Schema
 */ 

const RegisterSchema = new Schema({
    name: { type: String, required: true },
    email : { type: String, required: true, unique: true },
    password: { type: String, required: true },
    addedOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Register', RegisterSchema);
