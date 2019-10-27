import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import Video from "../Video";
import Playlist from "../containers/Playlist";
import StyledPlayer from "../styles/StyledPlayer";

//ChatApp ssection
import Dashboard from "../ChatApp/Dashboard";
import Store from "../../Store";

//#region ThemeStyle
const theme = {
  bgcolor: "#353535",
  bgcolorItem: "#414141",
  bgcolorItemActive: "#405c63",
  bgcolorPlayed: "#526d4e",
  border: "none",
  borderPlayed: "none",
  color: "#fff"
};

const themeLight = {
  bgcolor: "#fff",
  bgcolorItem: "#fff",
  bgcolorItemActive: "#80a7b1",
  bgcolorPlayed: "#7d9979",
  border: "1px solid #353535",
  borderPlayed: "none",
  color: "#353535"
};
//#endregion
const Player = props => {
  const videos = JSON.parse(document.querySelector('[name="videos"]').value);

  const savedState = JSON.parse(localStorage.getItem(`${videos.playlistId}`));

  //persist state in Local storage
  const [state, setState] = useState({
    videos: savedState ? savedState.videos : videos.playlist,
    activeVideo: savedState ? savedState.activeVideo : videos.playlist[0],
    nightMode: savedState ? savedState.nightMode : true,
    playlistId: savedState ? savedState.playlistId : videos.playlistId,
    autoplay: false
  });

  //Can only wirte string to local storage -thats why we convert to string
  //only update storage when state changes(like "watch" in vue)
  useEffect(() => {
    localStorage.setItem(`${state.playlistId}`, JSON.stringify({ ...state }));
  }, [state]);

  useEffect(() => {
    console.log("test");
    const videoId = props.match.params.activeVideo;
    if (videoId !== undefined) {
      const newActiveVideo = state.videos.findIndex(video => video.id === videoId);
      setState(prev => ({
        ...prev,
        activeVideo: prev.videos[newActiveVideo],
        autoplay: props.location.autoplay
      }));
    } else {
      props.history.push({
        pathname: `/${state.activeVideo.id}`,
        autoplay: false
      });
    }
  }, [props.history, props.location.autoplay, props.match.params.activeVideo, state.activeVideo.id, state.videos]);

  const nightModeCallback = () => {
    setState(prevState => ({ ...prevState, nightMode: !prevState.nightMode }));
  };

  const endCallback = () => {
    const videoId = props.match.params.activeVideo;
    const currentVideoIndex = state.videos.findIndex(video => video.id === videoId);

    const nextVideo = currentVideoIndex === state.videos.length - 1 ? 0 : currentVideoIndex + 1;

    props.history.push({
      pathname: `${state.videos[nextVideo].id}`,
      autoplay: false
    });
  };
  //mark video as played if played >10s (<11 because we dont want this to fire all the time)
  const progressCallback = e => {
    if (e.playedSeconds > 10 && e.playedSeconds < 11) {
      const videos = [...state.videos];
      const playedVideo = videos.find(video => video.id === state.activeVideo.id);
      playedVideo.played = true;

      setState(prevState => ({ ...prevState, videos }));

      //OR

      // setState({
      //   ...state,
      //   videos: state.videos.map( element => {
      //     return element.id === state.activeVideo.id
      //     ? { ...element, played: true }
      //     : element;
      //   })
      // });
    }
  };

  return (
    <ThemeProvider theme={state.nightMode ? theme : themeLight}>
      {state.videos !== null ? (
        <StyledPlayer>
          <Video
            active={state.activeVideo}
            autoplay={state.autoplay}
            endCallback={endCallback}
            progressCallback={progressCallback}
          />
          <Playlist
            videos={state.videos}
            active={state.activeVideo}
            nightModeCallback={nightModeCallback}
            nightMode={state.nightMode}
          />
        </StyledPlayer>
      ) : null}
      <Store>
        <Dashboard />
      </Store>
    </ThemeProvider>
  );
};

export default Player;
