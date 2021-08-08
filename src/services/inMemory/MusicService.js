/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */

const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class MusicService {
  constructor() {
    this._songs = [];
  }

  addSong({
    title, year, performer, genre, duration,
  }) {
    const id = `song-${nanoid(16)}`;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    duration = parseInt(duration, 10);
    year = parseInt(year, 10);

    const newSong = {
      id, title, year, performer, genre, duration, insertedAt, updatedAt,
    };

    this._songs.push(newSong);

    const isSuccess = this._songs.filter((song) => song.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Lagu gagal ditambahkan');
    }

    return id;
  }

  getSongs() {
    const songs = this._songs.map((song) => ({
      id: song.id,
      title: song.title,
      performer: song.performer,
    }));

    return songs;
  }

  getSongById(id) {
    const song = this._songs.filter((m) => m.id === id)[0];

    if (!song) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }

    return song;
  }

  editSongById(id, {
    title, year, performer, genre, duration,
  }) {
    const index = this._songs.findIndex((m) => m.id === id);
    duration = parseInt(duration, 10);
    year = parseInt(year, 10);

    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui lagu. Id tidak ditemukan');
    }

    const updatedAt = new Date().toISOString();

    this._songs[index] = {
      ...this._songs[index],
      title,
      year,
      performer,
      genre,
      duration,
      updatedAt,
    };
  }

  deleteSongById(id) {
    const index = this._songs.findIndex((m) => m.id === id);

    if (index === -1) {
      throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan');
    }
    this._songs.splice(index, 1);
  }
}

module.exports = MusicService;
