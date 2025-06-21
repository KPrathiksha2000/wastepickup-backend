//To create schema

//this will import mongoose library
const mongoose = require('mongoose');

//now we define the schema
const  requestSchema = new mongoose.Schema({
    wasteType: {
        type: String,
        required: true,
    },
    quantity: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "scheduled", "completed"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

//this will create a model Request from schema which will be used in routes request.js to perform crud operations
module.exports = mongoose.model('Request', requestSchema);
