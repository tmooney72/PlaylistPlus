import React, { useState } from 'react'
import useSearchForArtist from '@/hooks/useSearchForArtist'
import { Button, Input } from '@chakra-ui/react';
import useGetNotifications from '@/hooks/useGetNotifications';
import useAddArtistToNotifications from '@/hooks/useAddArtistToNotifications';
import useAuthStore from '@/store/authStore';

const Artists = () => {
    const { searchResults, searching, error, SearchForArtist } = useSearchForArtist();
    const { getNotifications, getting, error2 } = useGetNotifications();
    const [data, setData] = useState(null);
    const [searchFor, setSearchFor] = useState("");
    const user = useAuthStore(state => state.user);
    const handleClick = async () => {
        const q = await SearchForArtist(searchFor);
        console.log(q)
        setData(q['Results'].artists.items);
    }

    const handleChange = (event) => { 
        setSearchFor(event.target.value);
    }

    const handleLike = async (id, name) => {
        console.log(id)
        const q1 = await getNotifications(id);
        await useAddArtistToNotifications(name, id, user)
        console.log(q1);
    }

  return (
    <>
    <Button onClick={handleClick}></Button>
    <Input type='text' placeholder="Search for an artist" value={searchFor} onChange={handleChange}/>
        <div>
            {searching ? <p>Searching...</p> : (
                data?.map((artist, index) => (
                    <div key={index}>
                        <p>{artist.name}{artist.id}</p>
                        <Button onClick={() => handleLike(artist.id, artist.name)}>Like</Button>
                    </div>
                ))
            )}
        </div>
    </>

  )
}

export default Artists