import React from "react";
import PlaylistItem from "../PlaylistItem";
import withLink from "../hoc/withLink";
import StyledPlaylistitems from "../styles/StyledPlaylistItems";

//We get "modified/altered" PlaylistItem component here
const PlaylistItemWithLink = withLink(PlaylistItem);

//loops items in [] and creates playlist item foreach item in []
const Playlistitems = ({ videos, active }) => (
  <StyledPlaylistitems>
    {videos.map(video => (
      <PlaylistItemWithLink
        key={video.id}
        video={video}
        active={video.id === active.id ? true : false}
        played={video.played}
      />
    ))}
  </StyledPlaylistitems>
);

export default Playlistitems;
