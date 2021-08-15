const autoBind = require('auto-bind');
// const ClientError = require('../../exceptions/ClientError');
const successResponse = require('../../utils/responses/successResponse');

class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    autoBind(this);
  }

  async postSongHandler(request, h) {
    this._validator.validateSongPayload(request.payload);
    const {
      title, year, performer, genre, duration,
    } = request.payload;

    const songId = await this._service.addSong({
      title, year, performer, genre, duration,
    });

    return h.response(successResponse({
      message: 'Lagu berhasil ditambahkan',
      data: { songId },
    }))
      .code(201);
  }

  async getSongsHandler() {
    const songs = await this._service.getSongs();

    return successResponse({
      data: { songs },
    });
  }

  async getSongByIdHandler(request) {
    const { id } = request.params;
    const song = await this._service.getSongById(id);

    return successResponse({
      data: { song },
    });
  }

  async putSongByIdHandler(request) {
    this._validator.validateSongPayload(request.payload);
    const { id } = request.params;

    await this._service.editSongById(id, request.payload);

    return successResponse({
      message: 'Catatan berhasil diperbarui',
    });
  }

  async deleteSongByIdHandler(request) {
    const { id } = request.params;
    await this._service.deleteSongById(id);

    return successResponse({
      message: 'Catatan berhasil dihapus',
    });
  }
}

module.exports = SongsHandler;
