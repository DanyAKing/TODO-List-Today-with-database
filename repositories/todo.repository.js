/* eslint-disable no-underscore-dangle */
const { v4: uuidv4 } = require('uuid');
const { pool } = require('../utils/db');
const { TodoRecord } = require('../model/todo.record');

class TodoRepository {
  static _checkRecord(record) {
    if (!(record instanceof TodoRecord)) {
      throw new Error('Record must be an instance of TodoRecord');
    }
  }

  static insertData = async (record) => {
    TodoRepository._checkRecord(record);
    // krócej this.id = this.id ?? uuidv4();
    if (typeof record.id === 'undefined') {
      record.id = uuidv4();
    }

    await pool.execute('INSERT INTO `todos` (`todos`.`id`, `todos`.`title`) VALUES(:id, :title);', {
      id: record.id,
      title: record.title,
    });

    return record.id;
  };

  static updateData = async (record) => {
  // eslint-disable-next-line no-underscore-dangle
    record._validation();
    await pool.execute('UPDATE `todos` SET `todos`.`title` = :title WHERE `todos`.`id` = :id;', {
      id: record.id,
      title: record.title,
    });
  };

  static deleteData = async (id) => {
  // if (!this.id) {
  //   throw new Error('Todo has no ID.');
  // }

    await pool.execute('DELETE FROM `todos` WHERE `todos`.`id` = :id;', {
      id,
    });
  };

  static getOne = async (id) => {
    const [result] = await pool.execute('SELECT * FROM `todos` WHERE `id` = :id', {
      id,
    });

    // if (result.length === 1) {
    //   console.log('Find todos, ID', result[0].id, 'todo:', result[0].title);
    // } else {
    //   throw new Error('Cannot find todos.');
    // }
    // console.log(result[0]);

    return result[0];
  };

  static getAll = async () => {
    const [results] = await pool.execute('SELECT * FROM `todos` ORDER BY `todos`.`date` ASC;');
    return results;

  // if (results.length === null) {
  //   console.log(results);
  // } else {
  //   throw new Error('Todos empty.');
  // }
  };
}

module.exports = { TodoRepository };
