import React from "react";

const Spotify = (props) => {
  const songId = props.songId;
  document.querySelectorAll('[data-testid="play-pause-button"]').forEach(element => {
    element.dataset.testid = true;
  });
  
  return (
    <iframe
      title="Spotify Embed: Recommendation Playlist "
      src={`https://open.spotify.com/embed/track/${songId}?utm_source=autoplay&generator&theme=0`}
      width="100%"
      height="100%"
      style={{ minHeight: "360px" }}
      allow="autoplay; clipboard-write;encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      />
      );
}

export default Spotify;
