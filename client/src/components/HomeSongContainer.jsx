import React from "react";

import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

import { motion } from "framer-motion";

export const HomeSongContainer = ({
  dataArray,
  type,
  viewAllClicked,
  isFiltering,
}) => {
  const [{ isSongPlaying, songIndex }, dispatch] = useStateValue();
  const setCurrentPlaySong = (si) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_ISSONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (songIndex !== si) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: si,
      });
    }
  };
  return (
    <div className="p-4 mt-3">
      <div className="flex justify-between items-center">
        <h3 className="text-3xl"> {type}</h3>
        {dataArray?.length > 6 && isFiltering === false && (
          <h3
            onClick={() => viewAllClicked(type)}
            className="text-slate-500 hover:text-blue-600 cursor-pointer"
          >
            View all
          </h3>
        )}
      </div>
      <div className="w-full h-auto flex items-center justify-evenly gap-4 flex-wrap ">
        {isFiltering === false ? (
          <>
            {dataArray?.slice(0, 5).map((data, index) => (
              <motion.div
                key={data._id}
                whileTap={{ scale: 0.8 }}
                initial={{ opacity: 0, translateX: -50 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
                onClick={() => setCurrentPlaySong(index)}
              >
                <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={data.imageURL}
                    alt=""
                    className=" w-full h-full rounded-lg object-cover"
                  />
                </div>

                <p className="text-base text-headingColor font-semibold my-2">
                  {data.name.length > 25
                    ? `${data.name.slice(0, 25)}`
                    : data.name}
                  <span className="block text-sm text-gray-400 my-1">
                    {data.artist}
                  </span>
                </p>
              </motion.div>
            ))}
          </>
        ) : (
          <>
            {dataArray?.map((data, index) => (
              <motion.div
                key={data._id}
                whileTap={{ scale: 0.8 }}
                initial={{ opacity: 0, translateX: -50 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
                onClick={() => setCurrentPlaySong(index)}
              >
                <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={data.imageURL}
                    alt=""
                    className=" w-full h-full rounded-lg object-cover"
                  />
                </div>

                <p className="text-base text-headingColor font-semibold my-2">
                  {data.name.length > 25
                    ? `${data.name.slice(0, 25)}`
                    : data.name}
                  <span className="block text-sm text-gray-400 my-1">
                    {data.artist}
                  </span>
                </p>
              </motion.div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
