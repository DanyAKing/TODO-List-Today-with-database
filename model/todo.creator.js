const { TodoRecord } = require('./todo.record');

const todoCreator = async (title, id) => new TodoRecord(title, id);

module.exports = { todoCreator };
