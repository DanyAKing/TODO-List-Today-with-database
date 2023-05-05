const express = require('express');
const { TodoRecord } = require('../../model/todo.record');
// const { todoCreator } = require('../../model/todo.creator');

const routers = express.Router();

routers
// get todos
  .get('/', async (req, res) => {
    res
      .render('templates/todo_form', {
        todoList: await TodoRecord.getAll(),
      });
  })
  // create todos
  .post('/added', async (req, res) => {
    const title = req.body.todos;
    const todo = await new TodoRecord({
      title,
    });

    res
      .status(201)
      .render('templates/added', {
        title: req.body.todos,
        id: await todo.insertData(),
      });
  })
  // get added todos
  .get('/edit/:id', async (req, res) => {
    const { id } = req.params;

    res.render('templates/edit', {
      // static method
      todos: await TodoRecord.getOne(id),
    });
  })
  // update todos
  .put('/edited/:id', async (req, res) => {
    const { id } = req.params;
    const { todos } = req.body;

    const todo = new TodoRecord({
      id,
      title: todos,
    });
    await todo.updateData();

    res
      .render('templates/edited', {
        // static method
        todos: await TodoRecord.getOne(id),
      });
  })
  // confirm delete
  .get('/remove/:id', async (req, res) => {
    const { id } = req.params;

    res.render('templates/remove', {
      // static method
      todos: await TodoRecord.getOne(id),
    });
  })
  // delete todos
  .get('/removed/:id', async (req, res) => {
    const { id } = req.params;

    res.render('templates/removed', {
      // static method
      todo: await TodoRecord.deleteData(id),
    });
  });

module.exports = { routers };
