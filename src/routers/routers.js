const express = require('express');

const routers = express.Router();

routers
  .get('/', async (req, res) => {
    res.render('main/todo_form');
  })
  .post('/add', async (req, res) => {
    console.log(req.body);
    res.render('main/added', {
      todo: req.body.todo,
    });
  });

module.exports = { routers };
