import React, { useState, useEffect } from 'react'
import client from '../client'

function Artist(){
    const [isLoading, setIsLoading] = useState(false)
    const [artists, setArtists] = useState([])

    const fetchArtists = async () => {
        setIsLoading(true);
        const getArtists = await client.get("/", {
            params: {
                method: 'chart.getTopArtists',
                limit: 10
            }
        });
    
        const artistPromises = getArtists.data.artists.artist.map(artist => 
            client.get("/", {
                params: {
                    method: 'artist.getInfo',
                    artist: artist.name
                }
            })
        );
    
        const albumPromises = getArtists.data.artists.artist.map(artist => 
            client.get("/", {
                params: {
                    method: 'artist.getTopAlbums',
                    artist: artist.name,
                    limit: 5
                }
            })
        );
    
        const artistInfos = await Promise.all(artistPromises);
        const albumInfos = await Promise.all(albumPromises);
    
        const artistsWithAlbums = artistInfos.map((info, index) => ({
            ...info.data.artist,
            topAlbums: albumInfos[index].data.topalbums.album
        }));
    
        setArtists(artistsWithAlbums);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchArtists()
    }, [])

    const [topTracks, setTopTracks] = useState([]);

    const fetchTopTracks = async () => {
        const getTopTracks = await client.get("/", {
            params: {
                method: 'chart.getTopTracks',
                limit: 10
            }
        });
        setTopTracks(getTopTracks.data.tracks.track);
    }

    useEffect(() => {
        fetchArtists();
        fetchTopTracks();
    }, []);

    return (
        <>
            {artists.map((artist, index) => (
                <div className="container" key={index}>
                    <div className="content border border-3 px-3 py-2 rounded mb-3">
                        <h4>{artist.name}</h4>
                        <br />
                        <p className='Play-Count'>Play Count: {artist.stats.playcount}</p>
                        <p className='Listeners'> Listeners: {artist.stats.listeners}</p>
                        <p className='Summary'>Summary: {artist.bio.summary.replace(/<[^>]*>?/gm, '')}</p>
                        <div class="d-flex flex-row mb-3 Tags">
                            <p class="pe-2">Tags:</p>
                            {artist.tags.tag.map((tag, index) => (
                                <button type="button" class="btn btn-secondary p-2 mx-1" disabled key={index}>{tag.name}</button>
                            ))}
                        </div>
                        <p>Top 5 Albums:</p>
                        <div class="d-flex flex-row mb-3 my-2 Top-5-Albums">
                            {artist.topAlbums.map((album, index) => (
                                <div class="card mx-3" style={{width: "14rem"}} key={index}>
                                    <img src={album.image[3]['#text']} class="card-img-top" alt={album.name} />
                                    <div class="card-body">
                                        <h5 class="card-title text-center">{album.name}</h5>
                                        <h6 class="card-subtitle text-center">Play Count: {album.playcount}</h6>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}

            <br />
            
            <div className="container">
                <h1 className='text-center'>Top Tracks</h1>
                <br />
                <div class="d-flex flex-row mb-3 my-2 text-center" id='content1'>
                    {topTracks.slice(0, 5).map((track, index) => (
                        <div class="card mx-3" style={{width: "14rem"}} key={index}>
                            <img src={track.image[3]['#text']} class="card-img-top" alt={track.name} />
                            <div class="card-body">
                                <h5 class="card-title text-center">{track.name}</h5>
                                <p class="card-text">Duration: {new Date(track.duration * 1000).toISOString().substr(14, 5)}</p>
                                <p class="card-text">Play Count: {track.playcount}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div class="d-flex flex-row mb-3 my-2 " id='content2'>
                    {topTracks.slice(5, 10).map((track, index) => (
                        <div class="card mx-3" style={{width: "14rem"}} key={index}>
                            <img src={track.image[3]['#text']} class="card-img-top" alt={track.name} />
                            <div class="card-body">
                                <h5 class="card-title text-center">{track.name}</h5>
                                <p class="card-text">Duration: {new Date(track.duration * 1000).toISOString().substr(14, 5)}</p>
                                <p class="card-text">Play Count: {track.playcount}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
    
}

export default Artist;
