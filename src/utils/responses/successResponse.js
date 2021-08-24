module.exports = function successResponse(h, { message = '', data = {}, statusCode = 200 }) {
  const response = { status: 'success' };

  if (JSON.stringify(data) !== JSON.stringify({})) {
    response.data = data;
  }

  if (message) {
    response.message = message;
  }

  return h.response(response).code(statusCode);
};
