class TodoRecord {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;

    // eslint-disable-next-line no-underscore-dangle
    this._validation();
  }

  _validation = () => {
    if (this.title.trim().length < 3) {
      throw new Error('Invalid title, title should be at least 3 characters.');
    }

    if (this.title.length > 28) {
      throw new Error('Invalid title, title should be less than 28 characters.');
    }
  };
}

module.exports = { TodoRecord };
