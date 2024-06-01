import React, { useState, useEffect } from 'react'
import client from '../client'

function Home({ favoriteGenre }){
    const [isLoading, setIsLoading] = useState(false)
    const [artists, setArtists] = useState([])
    const [tracks, setTracks] = useState([])
    const [recommendedTracks, setRecommendedTracks] = useState([])

    const fetchArtist = async ()=>{
        setIsLoading(true) 
        const getArtist = await client.get("/",{
        params:{
            method:'chart.getTopArtists',
            limit:10
        }
        })
        setArtists(getArtist.data.artists.artist)
        setIsLoading(false)
    }

    const fetchTrack = async ()=>{
        setIsLoading(true) 
        const getTrack = await client.get("/",{
        params:{
            method:'chart.getTopTracks',
            limit:10
        }
        })
        setTracks(getTrack.data.tracks.track)
        setIsLoading(false)
    }

    const fetchRecommendedTracks = async ()=>{
        setIsLoading(true) 
        const getTrack = await client.get("/",{
        params:{
            method:'tag.getTopTracks',
            tag: favoriteGenre,
            limit:10
        }
        })
        setRecommendedTracks(getTrack.data.tracks.track)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchArtist()
        fetchTrack()
        fetchRecommendedTracks()
    }, [])

    return(
        <>
            <div className="row text-center" style={{marginLeft:"12%"}}>
                <div className="col-3 kiri mx-3" >
                    <h1>Top Artist</h1>
                    <br />
                    {artists.map((artist, index) => (
                        <div class="card border-3" style={{width: "18rem", height: "15rem", marginBottom:"10px"}} key={index}>
                            <div class="card-body">
                                <h6 class="card-title">#{index + 1}</h6>
                                <h4 class="card-title">{artist.name}</h4>
                                <br />
                                <p class="card-text">Play Count: {artist.playcount}</p>
                                <p class="card-text">Listeners: {artist.listeners}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="col-3 kanan mx-3">
                    <h1>Top Tracks</h1>
                    <br />
                    {tracks.map((track, index) => (
                        <div class="card border-3" style={{width: "18rem", height: "15rem", marginBottom:"10px"}} key={index}>
                            <div class="card-body">
                                <h6 class="card-title">#{index + 1}</h6>
                                <h4 class="card-title">{track.name}</h4>
                                <h6 class="card-title">by {track.artist.name}</h6>
                                <p class="card-text">Play Count: {track.playcount}</p>
                                <p class="card-text">Listeners: {track.listeners}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="col-3 recommended mx-3" >
                    <h1>Recommended</h1>
                    <br />
                    {recommendedTracks.map((track, index) => (
                        <div class="card border-3" style={{width: "18rem", height: "15rem", marginBottom:"10px"}} key={index}>
                            <div class="card-body">
                                <h6 class="card-title">#{index + 1}</h6>
                                <h4 class="card-title">{track.name}</h4>
                                <h6 class="card-title">by {track.artist.name}</h6>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home;