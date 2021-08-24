module.exports = function failResponse(h, { message, statusCode }) {
  const response = {
    status: 'fail',
    message,
  };

  return h.response(response).code(statusCode);
};
