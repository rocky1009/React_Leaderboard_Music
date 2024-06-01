import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import playlistsReducer from "./playlistsSlice"

const store = configureStore({
    reducer:{
        user: userReducer,
        playlists: playlistsReducer,
    },
})
export default store
