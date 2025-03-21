import React from 'react'
import { useState } from 'react'

const useGetNotifications = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [getting, setSearching] = useState(false);
  const [error2, setError] = useState(null);

    const getNotifications = async(artist) => {
  setSearching(true);
  try {
  const response = await fetch("https://desirable-emotion-production.up.railway.app/api/ArtistNotifications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        data: [artist] }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  setSearchResults(data)
  return data;
} catch (error2) {
    console.log("ERROR")
    return error2;
} finally {
    setSearching(false);
}}
return { getNotifications, getting, error2 }
}

export default useGetNotifications