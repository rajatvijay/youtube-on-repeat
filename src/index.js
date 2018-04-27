import React from "react";
import { render } from "react-dom";
import SearchBar from "./components/searchBar";
import Player from "./components/player";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { searchVideos } from "./youtube";

const DEFAULT_VIDEO = "https://www.youtube.com/embed/YuXLN23ZGQo";

// const styles = {
//   fontFamily: "sans-serif",
//   textAlign: "center"
// };

class App extends React.Component {
  constructor(props) {
    super(props);
    this.init();
    this.state = { lastSearchResult: [], currentVideo: DEFAULT_VIDEO };

    console.log("creating fn");
    window["onYouTubeIframeAPIReady"] = e => {
      console.log("calling fn");
      this.YT = window["YT"];
      this.player = new window["YT"].Player("player", {
        events: {
          onStateChange: this.onPlayerStateChange.bind(this),
          // onError: this.onPlayerError.bind(this),
          onReady: e => {
            console.log("ready");
          }
        }
      });
    };
  }

  startSearching = searchText => {
    console.log(searchText);
    const videos = searchVideos(searchText);
    this.setState({
      lastSearchResult: videos
    });
  };

  render() {
    const { currentVideo } = this.state;
    return (
      <div>
        <MuiThemeProvider>
          <SearchBar onSearchInitiated={this.startSearching} />
          <Player source={currentVideo} />
        </MuiThemeProvider>
      </div>
    );
  }

  init() {
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.async = 1;
    document.head.appendChild(tag);
  }

  onPlayerStateChange(event) {
    console.log(event);
    if (event.data === window["YT"].PlayerState.ENDED) {
      console.log("ended ");
      this.player.playVideo();
    }
  }
}

render(<App />, document.getElementById("root"));
