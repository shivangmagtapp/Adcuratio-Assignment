'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;


/**
 * User Schema
 */ 

const RatesSchema = new Schema({
    from: { type: String, required: true },
    to : { type: String, required: true },
    rate: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ExchangeRates', RatesSchema);
