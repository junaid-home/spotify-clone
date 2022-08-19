export const song = {
  title: 'Janib Song',
  description:
    'Aye jye teri janib, ana jana lag ta hai wajib, dil musafir hai tera ishq mein',
  thumbnail: '/album.jpg',
}

export const artist = {
  name: 'John Wick',
  email: 'abc123@gmail.com',
  picture: '/artist.jpg',
}

export const playlist = {
  name: 'My Playlist',
  thumbnail: '/album.jpg',
  owner: 'Junaid',
  songs: ['', ''],
}

export const songs = new Array(5).fill(song)
export const artists = new Array(5).fill(artist)
export const playlists = new Array(2).fill(playlist)
