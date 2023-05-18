const express = require('express');
const { TodoRepository } = require('../../repositories/todo.repository');
const { TodoRecord } = require('../../model/todo.record');
const { NotFoundError } = require('../../errors-handling/error-handling');

const routers = express.Router();

routers
// get all todos from database
  .get('/', async (req, res) => {
    res
      .render('templates/todo_form', {
        todoList: await TodoRepository.getAll(),
      });
  })
  // create todos and add to database
  .post('/added', async (req, res, next) => {
    const title = req.body.todos;

    try {
      const todo = new TodoRecord({
        title,
      });

      await TodoRepository._validation(todo);

      res
        .status(201)
        .render('templates/added', {
          title: req.body.todos,
          id: await TodoRepository.insertData(todo),
        });
    } catch (err) {
      next(err); // przekazanie błędu do kolejnego middlewara obsługi błędów
    }
  })
  // get one todos from database
  .get('/edit/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
      const todos = await TodoRepository.getOne(id);

      if (!todos) {
        throw new NotFoundError();
      }

      res.render('templates/edit', {
        todos,
      });
    } catch (err) {
      next(err); // przekazanie błędu do kolejnego middlewara obsługi błędów
    }
  })
  // update todos
  .put('/edited/:id', async (req, res, next) => {
    const { id } = req.params;
    const { todos } = req.body;

    try {
      const todo = new TodoRecord({
        id,
        title: todos,
      });

      TodoRepository._validation(todo);
      await TodoRepository.updateData(todo);

      res
        .render('templates/edited', {
          todos: await TodoRepository.getOne(id),
        });
    } catch (err) {
      next(err); // przekazanie błędu do kolejnego middlewara obsługi błędów
    }
  })
  // get one todos from database to delete
  .get('/remove/:id', async (req, res) => {
    const { id } = req.params;

    res.render('templates/remove', {
      todos: await TodoRepository.getOne(id),
    });
  })
  // delete todos from database
  .delete('/removed/:id', async (req, res) => {
    const { id } = req.params;

    res.render('templates/removed', {
      todo: await TodoRepository.deleteData(id),
    });
  });

module.exports = { routers };
