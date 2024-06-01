import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function Playlist({ currentUser, setRoute, setSelectedPlaylist }){
    const playlists = useSelector(state => state.playlists.listPlaylists); // access the playlists state

    // filter the playlists to only include those that belong to the current user
    const userPlaylists = playlists.filter(playlist => playlist.name === currentUser.name);

    return(
        <>
            <div className="row">
                <div className="col-11">
                    <h1>My Playlist</h1>
                </div>
                <div className="col-1">
                    <button type="button" class="btn btn-outline-success" onClick={() => setRoute('playlist_new')}>New+</button>
                </div>
            </div>
            
            <br />
            
            <div className="container">
                {userPlaylists.map((playlist, index) => (
                    <div class="card mb-3" style={{width: "12rem;"}} key={index} onClick={() => {setSelectedPlaylist(playlist.Title); setRoute('playlist_info')}}>
                        <div class="card-body">
                            <h5 class="card-title">Title: {playlist.Title}</h5>
                            <p class="card-text">Name: {playlist.name}</p>
                        </div>
                    </div>
                ))}
            </div>
            
        </>
    );
}

export default Playlist;
