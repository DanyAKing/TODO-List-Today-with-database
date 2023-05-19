/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const { v4: uuidv4 } = require('uuid');
const { pool } = require('../utils/db');
const { TodoRecord } = require('../model/todo.record');
const { ValidationError } = require('../errors-handling/error-handling');

class TodoRepository {
  static _checkRecord(record) {
    if (!(record instanceof TodoRecord)) {
      throw new Error('Record must be an instance of TodoRecord');
    }
  }

  static _validation(record) {
    if ((record.title.trim().length < 3) || (record.title.length > 28)) {
      throw new ValidationError();
    }
  }

  static insertData = async (record) => {
    TodoRepository._checkRecord(record);
    TodoRepository._validation(record);

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
    await pool.execute('UPDATE `todos` SET `todos`.`title` = :title WHERE `todos`.`id` = :id;', {
      id: record.id,
      title: record.title,
    });
  };

  static deleteData = async (id) => {
    await pool.execute('DELETE FROM `todos` WHERE `todos`.`id` = :id;', {
      id,
    });
  };

  static getOne = async (id) => {
    const [result] = await pool.execute('SELECT * FROM `todos` WHERE `id` = :id', {
      id,
    });

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
