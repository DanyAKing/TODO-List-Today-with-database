class NotFoundError extends Error {}

const handleError = (err, req, res) => {
  if (err instanceof NotFoundError) {
    res
      .status(404)
      .render('templates/error', {
        message: 'Can not find todos. Probably todos was removed or ID is incorrect.',
      });
  }
};

handleError();

module.exports = { handleError, NotFoundError };
