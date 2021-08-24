const autoBind = require('auto-bind');
const successResponse = require('../../utils/responses/successResponse');

class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    autoBind(this);
  }

  async postSongHandler(request, h) {
    this._validator.validateSongPayload(request.payload);
    const songId = await this._service.addSong(request.payload);

    return successResponse(h, {
      message: 'Lagu berhasil ditambahkan',
      data: { songId },
      statusCode: 201,
    });
  }

  async getSongsHandler(request, h) {
    const songs = await this._service.getSongs();

    return successResponse(h, {
      data: { songs },
    });
  }

  async getSongByIdHandler(request, h) {
    const { id } = request.params;
    const song = await this._service.getSongById(id);

    return successResponse(h, {
      data: { song },
    });
  }

  async putSongByIdHandler(request, h) {
    this._validator.validateSongPayload(request.payload);
    const { id } = request.params;

    await this._service.editSongById(id, request.payload);

    return successResponse(h, {
      message: 'Catatan berhasil diperbarui',
    });
  }

  async deleteSongByIdHandler(request, h) {
    const { id } = request.params;
    await this._service.deleteSongById(id);

    return successResponse(h, {
      message: 'Catatan berhasil dihapus',
    });
  }
}

module.exports = SongsHandler;
