import React, { useEffect } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import Header from './Header'

import { IoHome } from "react-icons/io5"
import { isActiveStyles, isNotActiveStyles } from '../utils/style'
import DashboardArtists from './DashboardArtists'
import DashboardAlbums from './DashboardAlbums'
import DashboardSong from './DashboardSong'
import DashboardHome from './DashboardHome'
import DashboardUsers from './DashboardUsers'
import DashboardNewSongs from './DashboardNewSongs'
import Alert from './Alert'
import { useStateValue } from '../context/StateProvider'




const Dashboard = () => {

    const [
        {
            alertType
        },
        dispath,
    ] = useStateValue();

    return (
        <div className='w-full h-auto flex flex-col items-center justify-center bg-primary'>
            <Header />

            <div className='w-[60%] my-2 p-4 flex items-center justify-evenly'>
                <NavLink to={"/dashboard/home"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}><IoHome className='text-2xl text-textColor' /></NavLink>
                <NavLink to={"/dashboard/user"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Users</NavLink>
                <NavLink to={"/dashboard/songs"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Songs</NavLink>
                <NavLink to={"/dashboard/artist"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Artist</NavLink>
                <NavLink to={"/dashboard/albums"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Albums</NavLink>
            </div>
            <div className='my-4 w-full p-4'>
                <Routes>
                    <Route path='/home' element={<DashboardHome />} />
                    <Route path='/user' element={<DashboardUsers />} />
                    <Route path='/songs' element={<DashboardSong />} />
                    <Route path='/artist' element={<DashboardArtists />} />
                    <Route path='/albums' element={<DashboardAlbums />} />
                    <Route path='/newSong' element={<DashboardNewSongs />} />
                </Routes>
            </div>

            {alertType && (
                <Alert type={alertType} />
            )}
        </div>

    )
}

export default Dashboard