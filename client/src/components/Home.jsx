import React, { useEffect, useState } from "react";
import { getAllSongs, getAllArtists, getAllAlbums } from "../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import Filter from "./Filter";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { HomeSongContainer } from "./HomeSongContainer";

const Home = () => {
  const [
    {
      searchTerm,
      isSongPlaying,
      songIndex,
      allSongs,
      artistFilter,
      filterTerm,
      albumFilter,
      languageFilter,
      allArtists,
      allAlbums,
    },
    dispatch,
  ] = useStateValue();

  const [filteredSongs, setFilteredSongs] = useState(null);
  const [isFiltering, setIsFiltering] = useState(false);
  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.songs,
        });
      });
    }

    if (!allArtists) {
      getAllArtists().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.artist,
        });
      });
    }
    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.album,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = allSongs.filter(
        (data) =>
          data.artist.toLowerCase().includes(searchTerm) ||
          data.language.toLowerCase().includes(searchTerm) ||
          data.name.toLowerCase().includes(searchTerm) ||
          data.artist.includes(artistFilter)
      );
      setFilteredSongs(filtered);
      setIsFiltering(true);
    } else {
      setFilteredSongs(null);
      setIsFiltering(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const filtered = allSongs?.filter((data) => data.artist === artistFilter);
    if (filtered) {
      setFilteredSongs(filtered);
      setIsFiltering(true);
    } else {
      setFilteredSongs(null);
      setIsFiltering(false);
    }
  }, [artistFilter]);

  useEffect(() => {
    const filtered = allSongs?.filter(
      (data) => data.category.toLowerCase() === filterTerm
    );
    if (filtered) {
      setFilteredSongs(filtered);
      setIsFiltering(true);
    } else {
      setFilteredSongs(null);
      setIsFiltering(false);
    }
  }, [filterTerm]);

  useEffect(() => {
    const filtered = allSongs?.filter((data) => data.album === albumFilter);
    if (filtered) {
      setFilteredSongs(filtered);
      setIsFiltering(true);
    } else {
      setFilteredSongs(null);
      setIsFiltering(false);
    }
  }, [albumFilter]);

  useEffect(() => {
    const filtered = allSongs?.filter(
      (data) => data.language === languageFilter
    );
    if (filtered) {
      setFilteredSongs(filtered);
      setIsFiltering(true);
    } else {
      setFilteredSongs(null);
      setIsFiltering(false);
    }
  }, [languageFilter]);

  const viewAllClicked = (clickedObject) => {
    {
      clickedObject === "All songs" && setFilteredSongs(allSongs);
    }
  };

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />
      <SearchBar />

      {searchTerm.length > 0 && (
        <p className="my-4 text-base text-textColor">
          Searched for :
          <span className="text-xl text-cartBg font-semibold">
            {searchTerm}
          </span>
        </p>
      )}

      <Filter setFilteredSongs={setFilteredSongs} />
      {!filteredSongs ? (
        <>
          <HomeSongContainer
            type="All songs"
            dataArray={allSongs}
            viewAllClicked={viewAllClicked}
            isFiltering={isFiltering}
          />

          <HomeSongContainer
            type="Artists"
            dataArray={allArtists}
            viewAllClicked={viewAllClicked}
            isFiltering={isFiltering}
          />
          <HomeSongContainer
            type="Albums"
            dataArray={allAlbums}
            viewAllClicked={viewAllClicked}
            isFiltering={isFiltering}
          />
          <HomeSongContainer
            type="Rap"
            dataArray={allSongs?.filter((item) => item.category === "Rap")}
            viewAllClicked={viewAllClicked}
            isFiltering={isFiltering}
          />
          <HomeSongContainer
            type="Rock"
            dataArray={allSongs?.filter((item) => item.category === "Rock")}
            viewAllClicked={viewAllClicked}
            isFiltering={isFiltering}
          />
          <HomeSongContainer
            type="Melody"
            dataArray={allSongs?.filter((item) => item.category === "Melody")}
            viewAllClicked={viewAllClicked}
            isFiltering={isFiltering}
          />
          <HomeSongContainer
            type="Karaoke"
            dataArray={allSongs?.filter((item) => item.category === "Karaoke")}
            viewAllClicked={viewAllClicked}
            isFiltering={isFiltering}
          />
        </>
      ) : (
        <HomeSongContainer
          type="Your result: "
          dataArray={filteredSongs ? filteredSongs : allSongs}
        />
      )}
    </div>
  );
};

export default Home;
