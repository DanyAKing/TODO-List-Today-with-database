const { v4: uuidv4 } = require('uuid');
const { pool } = require('../utils/db');

class TodoRecord {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;

    // eslint-disable-next-line no-underscore-dangle
    this._validation();
  }

  _validation = () => {
    if (this.title.trim().length < 3) {
      throw new Error('Invalid title, title should be at least 5 characters.');
    }

    if (this.title.length > 150) {
      throw new Error('Invalid title, title should be less than 150 characters.');
    }
  };

  insertData = async () => {
    // krócej this.id = this.id ?? uuidv4();
    if (typeof this.id === 'undefined') {
      this.id = uuidv4();
    }

    await pool.execute('INSERT INTO `todos` (`todos`.`id`, `todos`.`title`) VALUES(:id, :title);', {
      id: this.id,
      title: this.title,
    });

    return this.id;
  };

  deleteData = async () => {
    if (!this.id) {
      throw new Error('Todo has no ID.');
    }

    await pool.execute('DELETE FROM `todos` WHERE `todos`.`id` = :id;', {
      id: this.id,
    });

    console.log('Removed todos about ID', this.id);
  };

  updateData = async () => {
    // eslint-disable-next-line no-underscore-dangle
    this._validation();
    await pool.execute('UPDATE `todos` SET `todos`.`title` = :title WHERE `todos`.`id` = :id;', {
      id: this.id,
      title: this.title,
    });
    // console.log('Updated todos, ID:', this.id, 'update todos:', this.title);
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

module.exports = { TodoRecord };
