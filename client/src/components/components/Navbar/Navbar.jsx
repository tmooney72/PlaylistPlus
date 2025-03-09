import { Button, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import useLogout from '@/hooks/useLogout'

const Navbar = () => {
    const logout = () => {
        useLogout();
        

    }
  return (
    <header align='right' style={{backgroundColor: 'lightgreen', color: 'black', padding: '10px'}}>
        <nav>
            <ul>
                <Link to='/Home' style={{margin: '5px 10px'}}>Home</Link>
                <Link to='/Playlists'>Playlists</Link>
                <Link to='/Artists'>Artists</Link>
                <Button onClick={logout}>
                    <Text>Logout</Text>
                </Button>
            </ul>
        </nav>
    </header>
  )
}

export default Navbar