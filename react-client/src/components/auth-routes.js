import * as React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'

import Layout from 'components/layout'

import HomePage from 'pages/home'
import SerachPage from 'pages/search'
import PlaylistPage from 'pages/playlist'
import ArtistPage from 'pages/artist'
import FavouritesPage from 'pages/favourites'
import LibraryPage from 'pages/library'
import AccountPage from 'pages/account'
import ProfilePage from 'pages/profile'

function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout showPlayer />}>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/search" element={<SerachPage />} />
        <Route exact path="/playlist/:id" element={<PlaylistPage />} />
        <Route exact path="/artist/:id" element={<ArtistPage />} />
        <Route exact path="/library" element={<LibraryPage />} />
        <Route exact path="/favorites" element={<FavouritesPage />} />
        <Route exact path="/account" element={<AccountPage />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default PrivateRoutes
