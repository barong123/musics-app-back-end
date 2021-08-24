const ClientError = require('../exceptions/ClientError');
const failResponse = require('./responses/failResponse');

module.exports = (request, h) => {
  // get response context from request
  const { response } = request;

  // if (response?.output?.statusCode === 401) {
  //   return h.response(failResponse({
  //     message: response.output.payload.message,
  //   }))
  //     .code(response.output.payload.statusCode);
  // }

  if (response?.output?.statusCode === 401) {
    return failResponse(h, {
      message: response.output.payload.message,
      statusCode: response.output.payload.statusCode,
    });
  }

  // if (response instanceof ClientError) {
  //   return h.response(failResponse({
  //     message: response.message,
  //   }))
  //     .code(response.statusCode);
  // }

  if (response instanceof ClientError) {
    return failResponse(h, {
      message: response.message,
      statusCode: response.statusCode,
    });
  }

  // respon untuk server error
  // if (response instanceof Error) {
  //   return h.response(failResponse({
  //     message: 'Maaf, terjadi kegagalan pada server kami.',
  //   }))
  //     .code(response.output.payload.statusCode);
  // }

  if (response instanceof Error) {
    console.error(response);

    return failResponse(h, {
      // message: 'Maaf, terjadi kegagalan pada server kami.',
      message: response.message,
      statusCode: response.output.payload.statusCode,
    });
  }

  return response.continue || response;
};
