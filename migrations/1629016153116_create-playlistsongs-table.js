/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('playlistsongs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    playlist_id: {
      type: 'VARCHAR(50)',
      foreignKey: true,
    },
    song_id: {
      type: 'TEXT',
      foreignKey: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('playlistsongs');
};
