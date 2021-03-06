'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'usuario'},
    cart: {type: Object, required: true},
    address: {type: String, required: true},
    name: {type: String, required: true},
    paymentId: {type: String}
});

const Order = mongoose.model('Order', schema);
module.exports = Order;