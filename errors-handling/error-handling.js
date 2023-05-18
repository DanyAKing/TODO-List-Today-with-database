/* eslint-disable max-classes-per-file */
// class Error {}
class NotFoundError extends Error {}
class ValidationError extends Error {}

const handleError = async (err, req, res) => {
  if (err instanceof NotFoundError) {
    res
      .status(404)
      .render('templates/errors/error-not-found', {
        headerMessage: 'Todos not found!',
        message: 'Can not find todos. Probably todos was removed or ID is incorrect.',
      });
  }

  if (err instanceof ValidationError) {
    res
      .status(400)
      .render('templates/errors/error-incorrect-syntax', {
        headerMessage: 'Incorrect syntax!',
        message: 'Todos incorrect syntax. Todos must have more than 3 letters and less than 28.'
      });
  }
};

module.exports = { handleError, NotFoundError, ValidationError };
