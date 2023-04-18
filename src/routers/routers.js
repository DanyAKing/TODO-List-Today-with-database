const express = require('express');

const routers = express.Router();

routers
  .get('/', async (req, res) => {
    res.redirect('/todo');
  })
  .get('/todo', async (req, res) => {
    res.render('home/home');
  });

module.exports = { routers };
