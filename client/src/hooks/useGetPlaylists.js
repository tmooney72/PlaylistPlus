import { useState } from "react";

const useGetPlaylists = () => {
  const [playlists, setPlaylists] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPlaylists = async () => {
    const storedData = localStorage.getItem("Playlists");
    const storedTimestamp = localStorage.getItem("Playlists_Timestamp");
    const response = await fetch("https://desirable-emotion-production.up.railway.app/api/Playlists", {
      method: "GET",
      headers: { "Content-Type": "application/json", 'Cookie': 'session=.eJx1ksluo0AURX8lYt1IgDFDdmYwBkMcRmNvEENhymZyVYExUf49KK1OL1q9PU969-q890GR7gbaBLZlR71-UGmeA4yTb0i9UoqrCKIiS_t4rtziMjAqdt1Jeiu3RsdNcgGu4jXjHdCRw7nADygjdbpAIxAzxAwqp53MTYAym6zxaGEpVI06PocTrVbBVJNNfjHH_F7KRnkMXYy50rzIkcondtxHgsmmLYtzfkosSR_Xw1zHN11Wd1Jw9vf3jtluc5ELBXEwoD6gO9T9lMlvZ8ZzCTO0gzVGoCJQ1j1gp67C1TOpYDE7eRHZZWj1Op4n6e5kvZvkazbLNHsNzD47-OfU0oIb2FUp7dSWphTi4VABvR1q6WQAsnYedllQvygw9RABnKSEemVFnuN5fsUzfzlc_K0EZiEIlAuofqRu3I06Nb5zSvZxkgn-ST4GHoKsfcfa6qS9LbbRzDZF42_2gyj4ut_LpDG1OuqPHrLSOBOjp-2Ou_f23dDCBq8EdL26QXExCl8MOgwl-rhcIN9NGW0_-J3z8LPGSw6c6cl8f9jL5tIf510PljYvfZ0-a4gJ3XQFLJ90j-CYEvDy72DIapj_l_9gBNLiz5Yl6PeDked3mgJSBBD1-fkFHJzY1A.Z9uJJA.lSXfXIxegnwKGKooi9kzlaZAIA8' },
      credentials: "include",
    });
    console.log(response, 'response')

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