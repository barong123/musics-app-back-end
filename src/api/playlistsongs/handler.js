const autoBind = require('auto-bind');
const successResponse = require('../../utils/responses/successResponse');

class PlaylistSongsHandler {
  constructor(service, playlistsService, validator) {
    this._service = service;
    this._playlistsService = playlistsService;
    this._validator = validator;
    autoBind(this);
  }

  async postPlaylistSongHandler(request, h) {
    this._validator.validatePostPlaylistSongPayload(request.payload);

    const { playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);

    const { songId } = request.payload;

    await this._service.addPlaylistSong({ playlistId, songId });

    return successResponse(h, {
      message: 'Lagu berhasil ditambahkan ke playlist',
      statusCode: 201,
    });
  }

  async getPlaylistSongsHandler(request, h) {
    const { playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);

    const songs = await this._service.getPlaylistSongs(playlistId);

    return successResponse(h, {
      data: { songs },
    });
  }

  async deletePlaylistSongByIdHandler(request, h) {
    this._validator.validateDeletePlaylistSongPayload(request.payload);

    const { playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);

    const { songId } = request.payload;

    await this._service.deletePlaylistSongById(songId, playlistId);

    return successResponse(h, { message: 'Lagu berhasil dihapus dari playlist' });
  }
}

module.exports = PlaylistSongsHandler;
