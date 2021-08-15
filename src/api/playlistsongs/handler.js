const autoBind = require('auto-bind');
const successResponse = require('../../successResponse');

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

    return h.response(successResponse({
      message: 'Lagu berhasil ditambahkan ke playlist',
    }))
      .code(201);
  }

  async getPlaylistSongsHandler(request) {
    const { playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);

    const songs = await this._service.getPlaylistSongs(playlistId);

    return successResponse({
      data: { songs },
    });
  }

  async deletePlaylistSongByIdHandler(request) {
    this._validator.validateDeletePlaylistSongPayload(request.payload);

    const { playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);

    const { songId } = request.payload;

    await this._service.deletePlaylistSongById(songId, playlistId);

    return successResponse({ message: 'Lagu berhasil dihapus dari playlist' });
  }
}

module.exports = PlaylistSongsHandler;
