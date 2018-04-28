import React from "react";

class Player extends React.Component {
  componentDidUpdate() {
    console.log("calling component did update".toUpperCase());
    if (this.props.youtubeApiLoaded) {
      console.log("creating player instance".toUpperCase());
      this.player = new window["YT"].Player("player", {
        events: {
          onStateChange: this.onPlayerStateChange.bind(this),
          onReady: e => {
            console.log("player ready for events".toUpperCase());
            if (this.props.autoPlayVideo) {
              console.log(
                "previous video was playing so playing this video also".toUpperCase()
              );
              this.player.playVideo();
            }
          }
        }
      });
    } else {
      console.log("youtube API not loaded".toUpperCase());
    }
  }

  render() {
    return (
      <iframe
        title="player"
        width="560"
        height="315"
        src={this.props.source + "?enablejsapi=1"}
        frameBorder="0"
        id="player"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
    );
  }

  onPlayerStateChange(event) {
    if (event.data === window["YT"].PlayerState.ENDED) {
      console.log("video ended re-playing".toUpperCase());
      this.player.playVideo();
    } else if (event.data === window["YT"].PlayerState.PLAYING) {
      console.log("playing the current vide".toUpperCase());
      this.props.onVideoPlayed();
    }
  }
}

export default Player;
