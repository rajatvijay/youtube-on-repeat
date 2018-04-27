import React from "react";

class Player extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   this.player = new window['YT'].Player('player', {
  //     videoId: this.video,
  //     events: {
  //       'onStateChange': this.onPlayerStateChange.bind(this),
  //       'onError': this.onPlayerError.bind(this),
  //       'onReady': (e) => {
  //         console.log('ready');
  //       }
  //     }
  //   });
  // }

  render() {
    return (
      <iframe
        width="560"
        height="315"
        src={this.props.source + "?enablejsapi=1"}
        frameborder="0"
        id="player"
        allow="autoplay; encrypted-media"
        allowfullscreen
      />
    );
  }
}

export default Player;
