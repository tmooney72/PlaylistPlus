// client/src/hooks/useReorderPlaylists.js
import { useState } from 'react';

const useReorderPlaylists = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reorderPlaylists = async (newOrder) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://desirable-emotion-production.up.railway.app/api/reorder-playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          playlists: newOrder,
          uid: localStorage.getItem('uid') // Assuming you store the user ID
        }),
        credentials: "include",
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to reorder playlists');
      }
      
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { reorderPlaylists, loading, error };
};

export default useReorderPlaylists;