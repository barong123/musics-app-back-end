const Joi = require('joi');

const PostPlaylistSongPayloadSchema = Joi.object({
  songId: Joi.string().required(),
});

const DeletePlaylistSongPayloadSchema = Joi.object({
  songId: Joi.string().required().regex(/song-/),
});

module.exports = {
  PostPlaylistSongPayloadSchema,
  DeletePlaylistSongPayloadSchema,
};
