const express = require('express');
const { TodoRecord } = require('../../model/todo.record');

const routers = express.Router();

routers
  .get('/', async (req, res) => {
    res
      .render('main/todo_form', {
        todo: await TodoRecord.getAll(),
      });
  })
  .post('/add', async (req, res) => {
    const todo = await new TodoRecord({
      title: req.body.todo,
    });
    await todo.insertData();

    res
      .status(201)
      .render('main/added', {
        title: req.body.todo,
      });
  });

module.exports = { routers };

// const { v4: uuidv4 } = require('uuid');
// const { pool } = require('./utils/db');
// const { TodoRecord } = require('./model/todo.record');

// (async () => {
//   const findTodo = await TodoRecord.find('5758ad56-e5a5-40e3-8849-bf3c0f69cff3');
//   findTodo.title = 'new title';
//   await findTodo.updateData();

//   await pool.end();
// })();