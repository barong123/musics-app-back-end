module.exports = function successResponse({ message = '', data = {} }) {
  if (JSON.stringify(data) !== JSON.stringify({})) {
    return {
      status: 'success',
      message,
      data,
    };
  }

  return {
    status: 'success',
    message,
  };
};
