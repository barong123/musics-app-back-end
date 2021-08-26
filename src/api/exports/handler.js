const autoBind = require('auto-bind');
const successResponse = require('../../utils/responses/successResponse');

class ExportsHandler {
  constructor(service, playlistsService, validator) {
    this._service = service;
    this._playlistsService = playlistsService;
    this._validator = validator;
    autoBind(this);
  }

  async postExportNotesHandler(request, h) {
    this._validator.validateExportNotesPayload(request.payload);

    const { playlistId } = request.params;
    const userId = request.auth.credentials.id;
    await this._playlistsService.verifyPlaylistAccess(playlistId, userId);

    const message = {
      playlistId,
      targetEmail: request.payload.targetEmail,
    };

    await this._service.sendMessage('export:playlist', JSON.stringify(message));

    return successResponse(h, {
      message: 'Permintaan Anda dalam antrean',
      statusCode: 201,
    });
  }
}

module.exports = ExportsHandler;
