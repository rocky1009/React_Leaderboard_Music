import React, { useState, useEffect } from 'react'
import Logo from './assets/logo2.png'
import './App.css'
import client from './client.js'
import Album from './component/album.jsx'
import Artist from './component/artist.jsx'
import Home from './component/home.jsx'
import Hasil from './component/hasil.jsx'
import Register from './component/register.jsx'
import Login from './component/login.jsx'
import Playlists from './component/playlist.jsx'
import PlaylistNew from './component/playlist_new.jsx'
import PlaylistInfo from './component/playlist_info.jsx'

function App() {

  const [route, setRoute] = useState("home");
  const [searchInput, setSearchInput] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // state to store the current user
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsRegistered(false);
    setCurrentUser(null);
  };

  if (!isRegistered) {
    return (
      <div className="container">
        <Register setIsRegistered={setIsRegistered} setCurrentUser={setCurrentUser} />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="container">
        <Login setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <nav class="navbar navbar-expand-lg bg-body-secondary">
          <div class="container-fluid">
            
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <a class="" href="#" onClick={ () => {setRoute("home")} }>
                  <img src={Logo} alt="Bootstrap" width="25%" height="25%" />
              </a>
              <ul class="navbar-nav me-auto mb-2 mb-lg-0 " style={{marginRight:"4%"}}>
                <li class="nav-item">
                  <a class="nav-link active fs-2 mx-3" aria-current="page" href="#" onClick={ () => {setRoute("home")} }>Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active fs-2 mx-3" aria-current="page" href="#" onClick={ () => {setRoute("artist")} }>Artist</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active fs-2 mx-3" aria-current="page" href="#" onClick={ () => {setRoute("album")} }>Album</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active fs-2 mx-3" aria-current="page" href="#" onClick={ () => {setRoute("playlists")} }>Playlists</a>
                </li>
              </ul>
              <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchInput} onChange={e => setSearchInput(e.target.value)} />
                <button class="btn btn-outline-secondary" type="submit" onClick={ () => {setRoute("hasil")} }>Search</button>
              </form>
              <button class="btn btn-outline-danger ms-2" type="button" id='logout' onClick={handleLogout}>Logout</button>
              <a class="navbar-brand ms-4 " href="#" id='user'>{currentUser.name}</a>
            </div>
          </div>
        </nav>

        <br />

        <div className="content">
          {
            route=="home" && 
            <Home favoriteGenre={currentUser.favoriteGenre} />
          }
          {
            route=="album" && 
            <Album />
          }
          {
            route=="artist" && 
            <Artist />
          }
          {
            route=="hasil" && 
            <Hasil searchInput={searchInput} setRoute={setRoute} setSelectedPlaylist={setSelectedPlaylist} />
          }
          {
            route=="playlists" && 
            <Playlists currentUser={currentUser} setRoute={setRoute} setSelectedPlaylist={setSelectedPlaylist} />
          }
          {
            route=="playlist_new" && 
            <PlaylistNew currentUser={currentUser} setRoute={setRoute} />
          }
          {
            route=="playlist_info" && 
            <PlaylistInfo playlistTitle={selectedPlaylist} currentUser={currentUser} />
          }
        </div>
        
      </div>
    </>
  )
}

export default App;
