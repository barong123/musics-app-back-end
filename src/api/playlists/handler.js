const autoBind = require('auto-bind');
const successResponse = require('../../utils/responses/successResponse');

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

    return successResponse(h, {
      message: 'Playlist berhasil ditambahkan',
      data: { playlistId },
      statusCode: 201,
    });
  }

  async getPlaylistsHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const playlists = await this._service.getPlaylists(credentialId);

    return successResponse(h, {
      data: { playlists },
    });
  }

  async deletePlaylistByIdHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyPlaylistOwner(id, credentialId);
    await this._service.deletePlaylistById(id);

    return successResponse(h, { message: 'Playlist berhasil dihapus' });
  }
}

module.exports = PlaylistsHandler;
