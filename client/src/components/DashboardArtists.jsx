import React, { useEffect } from 'react'
import { getAllArtists } from '../api';
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';
import SongCard from './SongCard';
import { NavLink } from 'react-router-dom'
import { IoAdd, IoPause, IoPlay, IoTrash } from "react-icons/io5";

const DashboardArtists = () => {
    const [{ allArtists }, dispatch] = useStateValue();
    useEffect(() => {
        if (!allArtists) {
            getAllArtists().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_ARTISTS,
                    allArtists: data.artist
                })
            })
        }
    }, []);
    return (
        <div className='w-full p-4 flex items-center justify-center flex-col'>
            <NavLink to={"/dashboard/newSong"} className="flex items-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-400 hover:shadow-md cursor-pointer">
                <IoAdd />
            </NavLink >
            <div className="relative w-full  my-4 p-4 py-16 border border-gray-300 rounded-md">
                <ArtistContainer data={allArtists} />
            </div>
        </div>
    )
}

export const ArtistContainer = ({ data }) => {
    return (

        <div className=" w-full  flex flex-wrap gap-3  items-center justify-evenly">
            {data &&
                data.map((song, i) => (
                    <SongCard key={song._id} data={song} index={i} type="artist" />
                ))}
        </div>
    );
};

export default DashboardArtists