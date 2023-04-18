const { v4: uuidv4 } = require('uuid');
const { pool } = require('./utils/db');

const { TodoRecord } = require('./model/todo.record');

(async () => {
  // const todo = new TodoRecord({
  //   title: 'third Todo Today',
  // });

  // await todo.insertData();

  // const findTodo = await TodoRecord.findAll();

  await pool.end();
})();
