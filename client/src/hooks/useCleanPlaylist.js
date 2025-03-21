const useCleanPlaylist = () => {
  const cleanPlaylist = async (playlist) => {
    const response = await fetch('https://desirable-emotion-production.up.railway.app/api/CleanPlaylist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: playlist
      })
    })
    const data = await response.json()
    return data

  }
}

export default useCleanPlaylist