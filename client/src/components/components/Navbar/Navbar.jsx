import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <header align='right' style={{backgroundColor: 'lightgreen', color: 'black', padding: '10px'}}>
        <nav>
            <ul>
                <Link to='/Home' style={{margin: '5px 10px'}}>Home</Link>
                <Link to='/Playlists'>Playlists</Link>
            </ul>
        </nav>
    </header>
  )
}

export default Navbar