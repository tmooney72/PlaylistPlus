import React, { useState } from 'react'
import useSearchForArtist from '@/hooks/useSearchForArtist'
import { Button } from '@chakra-ui/react';
import useGetNotifications from '@/hooks/useGetNotifications';

const Artists = () => {
    const { searchResults, searching, error, SearchForArtist } = useSearchForArtist("uzi");
    const { getNotifications, getting, error2 } = useGetNotifications();
    const [data, setData] = useState(null);
    const handleClick = async () => {
        const q = await SearchForArtist();
        console.log(q)
        setData(q['Results'].artists.items);
        

    }

    const handleLike = async (id) => {
        console.log(id)
        const q1 = await getNotifications(id);
        console.log(q1);
    }

  return (
    <>
    <Button onClick={handleClick}></Button>
        <div>
            {searching ? <p>Searching...</p> : (
                data?.map((artist, index) => (
                    <div key={index}>
                        <p>{artist.name}{artist.id}</p>
                        <Button onClick={() => handleLike(artist.id)}>Like</Button>
                    </div>
                ))
            )}
        </div>
    </>

  )
}

export default Artists