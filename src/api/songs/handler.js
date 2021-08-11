/* eslint-disable no-underscore-dangle */
const autoBind = require('auto-bind');
// const ClientError = require('../../exceptions/ClientError');

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

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan',
      data: {
        songId,
      },
    });
    response.code(201);
    return response;

    // // Server ERROR!
    // const response = h.response({
    //   status: 'error',
    //   message: 'Maaf, terjadi kegagalan pada server kami.',
    // });
    // response.code(500);
    // console.error(error);
    // return response;
    // }
  }

  async getSongsHandler() {
    const songs = await this._service.getSongs();

    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async getSongByIdHandler(request) {
    const { id } = request.params;
    const song = await this._service.getSongById(id);
    return {
      status: 'success',
      data: {
        song,
      },
    };

    //   // Server ERROR!
    //   const response = h.response({
    //     status: 'error',
    //     message: 'Maaf, terjadi kegagalan pada server kami.',
    //   });
    //   response.code(500);
    //   console.error(error);
    //   return response;
    // }
  }

  async putSongByIdHandler(request) {
    // try {
    this._validator.validateSongPayload(request.payload);
    const { id } = request.params;

    await this._service.editSongById(id, request.payload);

    return {
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    };

    //   // Server ERROR!
    //   const response = h.response({
    //     status: 'error',
    //     message: 'Maaf, terjadi kegagalan pada server kami.',
    //   });
    //   response.code(500);
    //   console.error(error);
    //   return response;
    // }
  }

  async deleteSongByIdHandler(request) {
    const { id } = request.params;
    await this._service.deleteSongById(id);
    return {
      status: 'success',
      message: 'Catatan berhasil dihapus',
    };

    //   // Server ERROR!
    //   const response = h.response({
    //     status: 'error',
    //     message: 'Maaf, terjadi kegagalan pada server kami.',
    //   });
    //   response.code(500);
    //   console.error(error);
    //   return response;
    // }
  }
}

module.exports = SongsHandler;
