import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    listPlaylists:[
      {
        "Title": "Song1",
        "name": "Eric",
        "duration": "1:23:00",
        "likes": 100,
        "tracks": [
            {
              "title": "My Love Mine All Mine",
              "artist": "Mitski",
            },
            {
                "title": "Blank Space (Taylor's Version)",
                "artist": "Taylor Swift",
            },
        ]
      },
      {
        "Title": "Song2",
        "name": "Eric",
        "duration": "1:24:00",
        "likes": 101,
        "tracks": [
            {
              "title": "My Love Mine All Mine",
              "artist": "Mitski",
            },
            {
                "title": "Style (Taylor's Version)",
                "artist": "Taylor Swift",
            },
        ]
      },
      {
        "Title": "Song3",
        "name": "Eric",
        "duration": "1:25:00",
        "likes": 102,
        "tracks": [
            {
              "title": "My Love Mine All Mine",
              "artist": "Mitski",
            },
            {
                "title": "Wildest Dreams (Taylor's Version)",
                "artist": "Taylor Swift",
            },
        ]
      },
      {
        "Title": "Song4",
        "name": "Eric",
        "duration": "1:26:00",
        "likes": 103,
        "tracks": [
            {
              "title": "My Love Mine All Mine",
              "artist": "Mitski",
            },
            {
                "title": "Wildest Dreams (Taylor's Version)",
                "artist": "Taylor Swift",
            },
        ]
      },
      {
        "Title": "Song5",
        "name": "Eric",
        "duration": "1:27:00",
        "likes": 104,
        "tracks": [
            {
              "title": "My Love Mine All Mine",
              "artist": "Mitski",
            },
            {
                "title": "Wildest Dreams (Taylor's Version)",
                "artist": "Taylor Swift",
            },
        ]
      },
      {
        "Title": "Song6",
        "name": "Eric",
        "duration": "1:28:00",
        "likes": 105,
        "tracks": [
            {
              "title": "My Love Mine All Mine",
              "artist": "Mitski",
            },
            {
                "title": "Wildest Dreams (Taylor's Version)",
                "artist": "Taylor Swift",
            },
        ]
      },
      {
        "Title": "Song7",
        "name": "Eric",
        "duration": "1:29:00",
        "likes": 106,
        "tracks": [
            {
              "title": "My Love Mine All Mine",
              "artist": "Mitski",
            },
            {
                "title": "Wildest Dreams (Taylor's Version)",
                "artist": "Taylor Swift",
            },
        ]
      },
      {
        "Title": "Song8",
        "name": "Eric",
        "duration": "1:30:00",
        "likes": 107,
        "tracks": [
            {
              "title": "My Love Mine All Mine",
              "artist": "Mitski",
            },
            {
                "title": "Now That We Don't Talk (Taylor's Version) (From The Vault)",
                "artist": "Taylor Swift",
            },
        ]
      },
      {
        "Title": "Song9",
        "name": "Eric",
        "duration": "1:31:00",
        "likes": 108,
        "tracks": [
            {
              "title": "My Love Mine All Mine",
              "artist": "Mitski",
            },
            {
                "title": "Welcome to New York (Taylor's Version)",
                "artist": "Taylor Swift",
            },
        ]
      },
      {
        "Title": "MySong10",
        "name": "Evan",
        "duration": "1:32:00",
        "likes": 109,
        "tracks": [
            {
              "title": "My Love Mine All Mine",
              "artist": "Mitski",
            },
            {
                "title": "Is It Over Now? (Taylor's Version) (From the Vault)",
                "artist": "Taylor Swift",
            },
        ]
      },
      {
        "Title": "LovelySong11",
        "name": "Evan",
        "duration": "1:33:00",
        "likes": 110,
        "tracks": [
            {
              "title": "My Love Mine All Mine",
              "artist": "Mitski",
            },
            {
                "title": "Out of the Woods (Taylor's Version)",
                "artist": "Taylor Swift",
            },
        ]
      },
      {
        "Title": "Song12",
        "name": "Eric",
        "duration": "1:34:00",
        "likes": 111,
        "tracks": [
            {
              "title": "My Love Mine All Mine",
              "artist": "Mitski",
            },
            {
                "title": "Cruel Summer",
                "artist": "Taylor Swift",
            },
        ]
      },
    ],
}

const playlistsSlice = createSlice({
    name:"playlists",
    initialState,
    reducers:{
        addPlaylist : (state, action) => {
            state.listPlaylists.push(action.payload)
        },
        updatePlaylist : (state, action) => {
            const index = state.listPlaylists.findIndex((playlist) => playlist.Title === action.payload.Title)
            if(index==-1){
                throw new Error("Playlist not found")
            }
            state.listPlaylists[index] = action.payload
        },
        deletePlaylist : (state, action) => {
            const index = state.listPlaylists.findIndex((playlist) => playlist.Title === action.payload)
            if(index==-1){
                throw new Error("Playlist not found")
            }
            state.listPlaylists.splice(index, 1)
        },
    }
})

export const {addPlaylist,updatePlaylist,deletePlaylist} = playlistsSlice.actions

export default playlistsSlice.reducer
