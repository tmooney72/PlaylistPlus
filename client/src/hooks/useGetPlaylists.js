import { useState } from "react";

const useGetPlaylists = () => {
  const [playlists, setPlaylists] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPlaylists = async () => {
    const storedData = localStorage.getItem("Playlists");
    const storedTimestamp = localStorage.getItem("Playlists_Timestamp");

    if (storedData && storedTimestamp) {
      const now = Date.now();
      const oneHour = 3600000; // 1 hour in milliseconds

      if (now - parseInt(storedTimestamp, 10) < oneHour) {
        const parsedData = JSON.parse(storedData);
        setPlaylists(parsedData);
        return parsedData;
      } else {
        localStorage.removeItem("Playlists");
        localStorage.removeItem("Playlists_Timestamp");
      }
    }

    setLoading(true);
    try {
      const response = await fetch("/api/Playlists", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setPlaylists(data);
      localStorage.setItem("Playlists", JSON.stringify(data));
      localStorage.setItem("Playlists_Timestamp", Date.now().toString()); // Save timestamp
      return data;
    } catch (error) {
      setError(error.message);
      console.error("Fetch error:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { getPlaylists, playlists, error, loading };
};

export default useGetPlaylists;