import React from 'react'
import { useState } from 'react'

const useSearchForArtist = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);

    const SearchForArtist = async (query) => {
  setSearching(true);
  try {
  const response = await fetch("/api/SearchArtist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        data: query }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  setSearchResults(data)
  return data;
} catch (error) {
    console.log("ERROR")
    return error;
} finally {
    setSearching(false);
}}
return { SearchForArtist, searchResults, searching, error }
}

export default useSearchForArtist