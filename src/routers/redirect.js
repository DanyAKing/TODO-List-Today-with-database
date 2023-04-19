const express = require('express');

const redirect = express.Router();

redirect.get('/', async (req, res) => {
  res.redirect('/todolist');
});

module.exports = { redirect };
