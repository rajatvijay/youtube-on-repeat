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
    this.currentVideoPlaying = false;
    this.state = {
      lastSearchResult: [],
      currentVideo: DEFAULT_VIDEO,
      youtubeApiLoaded: false,
      autoPlayVideo: false
    };

    console.log("creating on ready fun for youtube API".toUpperCase());
    window["onYouTubeIframeAPIReady"] = e => {
      console.log("youtube API loaded, setting it true".toUpperCase());
      this.setState({
        youtubeApiLoaded: true
      });
    };
  }

  componentDidMount() {
    setTimeout(() => {
      console.log("changing video".toUpperCase());
      console.log(
        `old video waswas playing ${this.currentVideoPlaying}`.toUpperCase()
      );
      this.setState({
        currentVideo: "https://www.youtube.com/embed/8367ETnagHo",
        autoPlayVideo: this.currentVideoPlaying
      });
    }, 10000);
  }

  startSearching = searchText => {
    console.log(searchText);
    const videos = searchVideos(searchText);
    this.setState({
      lastSearchResult: videos
    });
  };

  onVideoPlayed = () => {
    this.currentVideoPlaying = true;
  };

  render() {
    const { currentVideo, youtubeApiLoaded, autoPlayVideo } = this.state;
    return (
      <div>
        <MuiThemeProvider>
          <SearchBar onSearchInitiated={this.startSearching} />
          <Player
            source={currentVideo}
            youtubeApiLoaded={youtubeApiLoaded}
            autoPlayVideo={autoPlayVideo}
            onVideoPlayed={this.onVideoPlayed}
          />
        </MuiThemeProvider>
      </div>
    );
  }

  init() {
    console.log("loading youtube API".toUpperCase());
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.async = 1;
    document.head.appendChild(tag);
  }
}

render(<App />, document.getElementById("root"));
