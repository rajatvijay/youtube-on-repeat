import React from "react";
import logger from "../logger";

const { iframeAPILogger } = logger;

class Player extends React.Component {
  componentDidUpdate(previousProps) {
    iframeAPILogger.log("calling component did update".toUpperCase());
    if (
      !this.player ||
      (this.props.source && previousProps.source !== this.props.source)
    ) {
      if (this.props.youtubeApiLoaded) {
        iframeAPILogger.log("creating player instance".toUpperCase());
        this.player = new window["YT"].Player("player", {
          events: {
            onStateChange: this.onPlayerStateChange.bind(this),
            onReady: e => {
              iframeAPILogger.log("player ready for events".toUpperCase());
              if (this.props.autoPlayVideo) {
                iframeAPILogger.log(
                  "previous video was playing so playing this video also".toUpperCase(),
                  this.player
                );

                // Putting a timeout to let the youtube API load
                // and create the playVideo function in the player instance
                setTimeout(() => {
                  this.player.playVideo();
                }, 500);
              }
            }
          }
        });
      } else {
        iframeAPILogger.log("youtube API not loaded".toUpperCase());
      }
    } else {
      iframeAPILogger.log(
        "not creating a new player instance".toUpperCase(),
        this.player,
        this.props.source,
        previousProps.source
      );
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
      iframeAPILogger.log("video ended re-playing".toUpperCase());
      // console.log(this.player);
      setTimeout(() => {
        this.player.playVideo();
      }, 500);
    } else if (event.data === window["YT"].PlayerState.PLAYING) {
      iframeAPILogger.log("playing the current video".toUpperCase());
      this.props.onVideoPlayed();
    }
  }
}

export default Player;
