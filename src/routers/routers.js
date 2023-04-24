const express = require('express');
const { TodoRecord } = require('../../model/todo.record');

const routers = express.Router();

routers
// get todos
  .get('/', async (req, res) => {
    res
      .render('templates/todo_form', {
        todo: await TodoRecord.getAll(),
      });
  })
  // create todos
  .post('/added', async (req, res) => {
    const todo = await new TodoRecord({
      title: req.body.todo,
    });

    res
      .status(201)
      .render('templates/added', {
        title: req.body.todo,
        id: await todo.insertData(),
      });
  })
  // get added todos
  .get('/edit/:id', async (req, res) => {
    const { id } = req.params;

    res.render('templates/edit', {
      todos: await TodoRecord.getOne(id),
    });
  })
  // update todos
  .put('/edited', async (req, res) => {
    console.log(req.body);

    res
      .render('templates/edited', {
        // todos: await TodoRecord.getOne(id),
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