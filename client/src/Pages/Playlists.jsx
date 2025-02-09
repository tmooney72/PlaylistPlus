import { Button } from '@chakra-ui/react'
import React from 'react'
import { useEffect, useState } from 'react'

const Playlists = () => {
    const [data, setData] = useState([{}])
    const [playlist, setPlaylist] = useState("")
    const [songs, setSongs] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch("/api/Playlists").then(
          res => res.json()
        ).then(data => {
          setData(data)
          console.log(data)
        })
      }, [])

      function postPlaylist(playlist) {
        fetch('/api/CleanPlaylist', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              data: playlist
            })
          })
          .then(response => response.json())
          .then(data => {
            setPlaylist(data.Playlist[0])
            setSongs(data.Playlist[1])
          })
          .catch(error => {
            console.error('Error:', error);
          });
          setLoading(false);
      }
      let playlistScreen = (<div>
        {(typeof data.Playlists === 'undefined') ? (
          <p>Loading...</p>
        ) : (
          data.Playlists.map((Playlist, i) => (
              <div>
            <p key={i}>{Playlist[0]} {Playlist[1]}</p>
            <Button onClick={() => postPlaylist(Playlist[0])} w={10}><img src={Playlist[2]} /></Button>
            
            </div>
          ))
        )}
      </div>)
      let songScreen = (
        <div>
      <p>{playlist}</p>
      <p>{songs}</p>
      </div>
      )
      
    return (
        <div>
            {loading ? playlistScreen : songScreen}
        </div>
      )
}

export default Playlists