import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; // import useSelector
import client from '../client'

function Hasil({ searchInput, setRoute, setSelectedPlaylist }){
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [tracks, setTracks] = useState([]);
    const playlists = useSelector(state => state.playlists.listPlaylists); // select listPlaylists from Redux store
    const [filteredPlaylists, setFilteredPlaylists] = useState([]);

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await client.get('/', {
            params: {
                method: 'artist.search',
                artist: searchInput,
                limit: 10
            }
            });
            setArtists(response.data.results.artistmatches.artist);
        } catch (error) {
            console.error(error);
        }
        }

        fetchData();
    }, [searchInput]);

    useEffect(() => {
    async function fetchData() {
        try {
        const response = await client.get('/', {
            params: {
            method: 'album.search',
            album: searchInput,
            limit: 10
            }
        });
        setAlbums(response.data.results.albummatches.album);
        } catch (error) {
        console.error(error);
        }
    }
    
    fetchData();
    }, [searchInput]);

    useEffect(() => {
    async function fetchData() {
        try {
        const response = await client.get('/', {
            params: {
            method: 'track.search',
            track: searchInput,
            limit: 10
            }
        });
        setTracks(response.data.results.trackmatches.track);
        } catch (error) {
        console.error(error);
        }
    }
    
    fetchData();
    }, [searchInput]);

    useEffect(() => {
        setFilteredPlaylists(playlists.filter(playlist => playlist.Title.includes(searchInput)).slice(0, 10));
    }, [searchInput, playlists]);

    return(
        <>
            <div className="container text-center">
                <div className="playlists">
                    <h1>Playlists:</h1>
                    <br />
                    <div class="row">
                        {filteredPlaylists.map((playlist, index) => (
                            <div class="col-sm-12 col-md-6 col-lg-2 mx-3" key={index}>
                                <div class="card ms-5 mb-3" style={{width: "12rem;"}} key={index} onClick={() => {setSelectedPlaylist(playlist.Title); setRoute('playlist_info')}}>
                                    <div class="card-body">
                                        <h5 class="card-title text-center">{playlist.Title}</h5>
                                        <p class="card-text">Name: {playlist.name}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="content-artist">
                    <h1>Artist:</h1>
                    <br />
                    <div class="row">
                    {artists.slice(0, 5).map(artist => (
                        <div class="col-sm-12 col-md-6 col-lg-2 mx-3" key={artist.name}>
                        <div class="card mx-3" style={{width: "14rem"}} onClick={() => setRoute("artist")}>
                            <div class="card-body">
                            <h5 class="card-title text-center">{artist.name}</h5>
                            <p class="card-text">Listeners: {artist.listeners}</p>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>

                    <br />

                    <div class="row">
                    {artists.slice(5).map(artist => (
                        <div class="col-sm-12 col-md-6 col-lg-2 mx-3" key={artist.name}>
                        <div class="card mx-3" style={{width: "14rem"}} onClick={() => setRoute("artist")}>
                            <div class="card-body">
                            <h5 class="card-title text-center">{artist.name}</h5>
                            <p class="card-text">Listeners: {artist.listeners}</p>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>

                <br />
                <br />

                <div className="content-album">
                    <h1>Album:</h1>
                    <br />
                    <div class="row">
                        {albums.slice(0, 5).map(album => (
                        <div class="col-sm-12 col-md-6 col-lg-2 mx-3" key={album.name}>
                            <div class="card mx-3" style={{width: "14rem"}} onClick={() => setRoute("album")}>
                            <img src={album.image[3]['#text']} class="card-img-top album-image" alt={album.name} />
                            <div class="card-body">
                                <h5 class="card-title text-center">{album.name}</h5>
                                <p class="card-text">Artist Name: {album.artist}</p>
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>

                    <br />

                    <div class="row">
                        {albums.slice(5).map(album => (
                        <div class="col-sm-12 col-md-6 col-lg-2 mx-3" key={album.name}>
                            <div class="card mx-3" style={{width: "14rem"}} onClick={() => setRoute("album")}>
                            <img src={album.image[3]['#text']} class="card-img-top album-image" alt={album.name} />
                            <div class="card-body">
                                <h5 class="card-title text-center">{album.name}</h5>
                                <p class="card-text">Artist Name: {album.artist}</p>
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>

                <br />
                <br />

                <div className="content-track">
                    <h1>Track:</h1>
                    <br />
                    <div class="row">
                        {tracks.slice(0, 5).map(track => (
                        <div class="col-sm-12 col-md-6 col-lg-2 mx-3" key={track.name}>
                            <div class="card mx-3" style={{width: "14rem"}}>
                            <img src={track.image[3]['#text']} class="card-img-top track-image" alt={track.name} />
                            <div class="card-body">
                                <h5 class="card-title text-center">{track.name}</h5>
                                <p class="card-text">Artist Name: {track.artist}</p>
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>

                    <br />

                    <div class="row">
                        {tracks.slice(5).map(track => (
                        <div class="col-sm-12 col-md-6 col-lg-2 mx-3" key={track.name}>
                            <div class="card mx-3" style={{width: "14rem"}}>
                            <img src={track.image[3]['#text']} class="card-img-top track-image" alt={track.name} />
                            <div class="card-body">
                                <h5 class="card-title text-center">{track.name}</h5>
                                <p class="card-text">Artist Name: {track.artist}</p>
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default Hasil;