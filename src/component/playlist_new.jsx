import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addPlaylist } from '../app/playlistsSlice'

function PlaylistNew({ currentUser, setRoute }){
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    return(
        <>
            <form onSubmit={(e) => {
                e.preventDefault();
                dispatch(addPlaylist({
                    Title: title,
                    name: currentUser.name,
                    duration: '00:00',
                    likes: '0',
                    tracks: []
                }));
                setRoute('playlists');
            }}>
                <div class="mb-3">
                    <label for="newPlaylist" class="form-label">New Playlist Title:</label>
                    <input type="text" class="form-control" id="newPlaylist" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <button type="submit" class="btn btn-primary">Add</button>
            </form>
            
        </>
    );
}

export default PlaylistNew;