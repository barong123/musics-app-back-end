const autoBind = require('auto-bind');
const successResponse = require('../../successResponse');

class CollaborationsHandler {
  constructor(collaborationsService, playlistsService, validator) {
    this._collaborationsService = collaborationsService;
    this._playlistsService = playlistsService;
    this._validator = validator;
    autoBind(this);
  }

  async postCollaborationHandler(request, h) {
    this._validator.validateCollaborationPayload(request.payload);
    const { id: credentialId } = request.auth.credentials;
    const { playlistId, userId } = request.payload;

    await this._playlistsService.verifyplaylistOwner(playlistId, credentialId);
    const collaborationId = await this._collaborationsService.addCollaboration(playlistId, userId);

    return h.response(successResponse({
      message: 'Kolaborasi berhasil ditambahkan',
      data: {
        collaborationId,
      },
    }));
  }

  async deleteCollaborationHandler(request) {
    this._validator.validateCollaborationPayload(request.payload);
    const { id: credentialId } = request.auth.credentials;
    const { noteId, userId } = request.payload;

    await this._notesService.verifyNoteOwner(noteId, credentialId);
    await this._collaborationsService.deleteCollaboration(noteId, userId);

    return successResponse({ message: 'Kolaborasi berhasil dihapus' });
  }
}

module.exports = CollaborationsHandler;
