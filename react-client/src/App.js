import 'the-new-css-reset/css/reset.css'
import 'react-toastify/dist/ReactToastify.css'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Layout from 'components/layout'
import PrivateRoute from 'components/private-route'
import UnAuthRoute from 'components/un-auth-route'

import LoginPage from 'pages/login'
import SignupPage from 'pages/signup'
import Oauth2Page from 'pages/Oauth2'
import HomePage from 'pages/home'
import SerachPage from 'pages/search'
import PlaylistPage from 'pages/playlist'
import ArtistPage from 'pages/artist'
import FavouritesPage from 'pages/favourites'
import LibraryPage from 'pages/library'
import AccountPage from 'pages/account'
import ProfilePage from 'pages/profile'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/search" element={<SerachPage />} />
            <Route exact path="/playlist/:id" element={<PlaylistPage />} />
            <Route exact path="/artist/:id" element={<ArtistPage />} />
            <Route exact path="/library" element={<LibraryPage />} />
            <Route exact path="/favorites" element={<FavouritesPage />} />
            <Route exact path="/account" element={<AccountPage />} />
            <Route exact path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>
        <Route path="/" element={<UnAuthRoute />}>
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignupPage />} />
          <Route path="/" element={<Layout />}>
            <Route exact path="/facebook/redirect" element={<Oauth2Page />} />
            <Route exact path="/google/redirect" element={<Oauth2Page />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
