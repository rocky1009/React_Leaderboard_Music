import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updatePlaylist } from '../app/playlistsSlice'


function PlaylistInfo({ playlistTitle, currentUser }){
    const playlists = useSelector(state => state.playlists.listPlaylists); // access the playlists state
    const playlist = playlists.find(playlist => playlist.Title === playlistTitle); // find the playlist with the same title
    const [likes, setLikes] = useState(playlist.likes);
    const [buttonText, setButtonText] = useState('♡');
    const dispatch = useDispatch();

    const handleButtonClick = () => {
        if (buttonText === '♡') {
            setLikes(likes + 1);
            setButtonText('♥');
        } else {
            setLikes(likes - 1);
            setButtonText('♡');
        }
        dispatch(updatePlaylist({...playlist, likes: likes}));
    }
    if (!playlist) {
        return null; // or return a loading spinner, or some placeholder content
    }

    return(
        <>
            <div className="container">
                <h1>{playlist.Title}</h1>
                <h5>By: {playlist.name}</h5>
                <p>Duration: {playlist.duration}</p>
                <p>Likes: {playlist.likes}</p>
                {playlist.name !== currentUser.name && (
                    <button type="button" class="btn btn-outline-dark rounded-circle" id='likeButton' onClick={handleButtonClick}>{buttonText}</button>
                )}
            </div>
            <br />
            <div className="container container-track">
                {playlist.tracks.map((track, index) => (
                    <div class="card mb-3" style={{width: "18rem;"}} key={index}>
                        <div class="card-body">
                            <h5 class="card-title">Title: {track.title}</h5>
                            <p class="card-text">Artist: {track.artist}</p>
                        </div>
                    </div>
                ))}
            </div>
            
        </>
    );
}

export default PlaylistInfo;
