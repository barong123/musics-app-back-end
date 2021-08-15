const ClientError = require('./exceptions/ClientError');

module.exports = (request, h) => {
  // mendapatkan konteks response dari request
  const { response } = request;

  if (response?.output?.statusCode === 401) {
    const newResponse = h.response({
      status: 'fail',
      message: response.output.payload.message,
    });
    newResponse.code(response.output.payload.statusCode);
    return newResponse;
  }

  if (response instanceof ClientError) {
    // membuat response baru dari response toolkit sesuai kebutuhan error handling
    const newResponse = h.response({
      status: 'fail',
      message: response.message,
    });
    newResponse.code(response.statusCode);
    return newResponse;
  }

  // respon untuk server error
  if (response instanceof Error) {
    const newResponse = h.response({
      status: 'error',
      message: 'Maaf, terjadi kegagalan pada server kami.',
    });
    newResponse.code(500);
    console.error(response);
    return newResponse;
  }

  // jika bukan ClientError, lanjutkan dengan response sebelumnya (tanpa terintervensi)
  return response.continue || response;
};
