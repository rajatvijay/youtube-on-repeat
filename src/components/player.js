import React from "react";

class Player extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidUpdate() {
    console.log("calling did update");
    if (this.props.youtubeApiLoaded) {
      console.log("calling fn");
      // this.YT = window["YT"];
      this.player = new window["YT"].Player("player", {
        events: {
          onStateChange: this.onPlayerStateChange.bind(this),
          onReady: e => {
            console.log("ready");
            if (this.props.autoPlayVideo) {
              this.player.playVideo();
            }
          }
        }
      });
    } else {
      console.log("youtube API no loaded");
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
    console.log(event);
    if (event.data === window["YT"].PlayerState.ENDED) {
      console.log("ended ");
      this.player.playVideo();
    }
  }
}

export default Player;
