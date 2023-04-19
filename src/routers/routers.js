const express = require('express');
const { TodoRecord } = require('../../model/todo.record');

const routers = express.Router();

routers
  .get('/', async (req, res) => {
    res.render('main/todo_form');
  })
  .post('/add', async (req, res) => {
    const todo = new TodoRecord({
      title: req.body.todo,
    });
    // todo.insertData();

    res.render('main/added', {
      title: req.body.todo,
    });

    // res.json({ title: req.body.title });
  });

module.exports = { routers };
