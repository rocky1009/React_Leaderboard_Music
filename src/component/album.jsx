import React, { useState, useEffect } from "react";
import client from '../client'

function Album(){
    const [isLoading, setIsLoading] = useState(false);
    const [albums, setAlbums] = useState([]);

    const fetchAlbums = async () => {
        setIsLoading(true);

        const getTopArtists = await client.get("", {
            params: {
                method: 'chart.getTopArtists',
                limit: 10
            }
        });

        const albumPromises = getTopArtists.data.artists.artist.flatMap(artist => 
            client.get("", {
                params: {
                    method: 'artist.getTopAlbums',
                    artist: artist.name,
                    limit: 5
                }
            })
            .then(response => response.data.topalbums.album.map(album => 
                client.get("", {
                    params: {
                        method: 'album.getInfo',
                        artist: artist.name,
                        album: album.name
                    }
                })
                .then(response => ({
                    artwork: response.data.album.image[3]['#text'],
                    title: response.data.album.name,
                    artist: response.data.album.artist,
                    releaseDate: response.data.album.wiki ? response.data.album.wiki.published : 'N/A',
                    playCount: response.data.album.playcount,
                    summary: response.data.album.wiki ? response.data.album.wiki.summary : 'N/A'
                }))
            ))
        );

        const albumInfos = await Promise.all(albumPromises.flat());

        setAlbums(albumInfos);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchAlbums();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return(
        <>
            {albums.map(album => (
                <div className="container" key={album.title}>
                    <div className="content border border-3 px-3 py-2 rounded">
                        <img src={album.artwork} class="rounded mx-auto d-block" alt={album.title}/>
                        <br />
                        <h4>{album.title}</h4>
                        <h5>{album.artist}</h5>
                        <br />
                        <p className='Releasedate'>Release Date: {album.releaseDate}</p>
                        <p className='Play-Count'>Play Count: {album.playCount}</p>
                        <p className='Summary'> Summary: {album.summary}</p>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Album;
