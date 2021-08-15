const autoBind = require('auto-bind');
// const ClientError = require('../../exceptions/ClientError');
const successResponse = require('../../successResponse');

class PlaylistsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    autoBind(this);
  }

  async postPlaylistHandler(request, h) {
    this._validator.validatePostPlaylistPayload(request.payload);

    const { name } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    const playlistId = await this._service.addPlaylist({
      name, owner: credentialId,
    });

    return h.response(successResponse({
      message: 'Playlist berhasil ditambahkan',
      data: { playlistId },
    }))
      .code(201);
  }

  async getPlaylistsHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const playlists = await this._service.getPlaylists(credentialId);

    return successResponse({
      data: { playlists },
    });
  }

  async deletePlaylistByIdHandler(request) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyPlaylistOwner(id, credentialId);
    await this._service.deletePlaylistById(id);

    return successResponse({ message: 'Playlist berhasil dihapus' });
  }
}

module.exports = PlaylistsHandler;
