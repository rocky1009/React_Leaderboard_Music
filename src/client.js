import axios from 'axios'

//ini adalah instance dari axios yang sudah di custom dengan baseURL dan headers untuk menampung API Key
const client = axios.create({
  baseURL:"http://ws.audioscrobbler.com/2.0/",
  params:{
    "api_key":"07ae0a4256ba59b00201b1c8edd6113a",
    format: "json",
  },
})

export default client