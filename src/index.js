import React from "react";
import { render } from "react-dom";
import SearchBar from "./components/searchBar";
import Player from "./components/player";
import SearchResults from "./components/searchResults";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {
  initializeSearchAPI,
  initializeIframAPI,
  searchVideos,
  OAUTH2_CLIENT_ID
} from "./youtube";
import logger from "./logger";

const DEFAULT_VIDEO = "https://www.youtube.com/embed/YuXLN23ZGQo";

// Logger
const { iframeAPILogger, searchAPILogger } = logger;

class App extends React.Component {
  constructor(props) {
    super(props);

    initializeIframAPI();
    initializeSearchAPI();
    this.currentVideoPlaying = false;
    this.state = {
      lastSearchResult: [],
      currentVideo: DEFAULT_VIDEO,
      youtubeApiLoaded: false,
      autoPlayVideo: false,
      disableSearchBar: true
    };

    iframeAPILogger.log("creating on ready fun for iframe API".toUpperCase());
    window["onYouTubeIframeAPIReady"] = e => {
      iframeAPILogger.log("iframe API loaded, setting it true".toUpperCase());
      this.setState({
        youtubeApiLoaded: true
      });
    };

    searchAPILogger.log("creating on ready fun for search API".toUpperCase());
    window["onClientLoad"] = () => {
      searchAPILogger.log("first search api loaded".toUpperCase());
      window["gapi"].client.load("youtube", "v3", () => {
        searchAPILogger.log("setting client api key".toUpperCase());
        window["gapi"].client.setApiKey(OAUTH2_CLIENT_ID);
        this.setState({
          disableSearchBar: false
        });
      });
    };
  }

  startSearching = searchText => {
    searchAPILogger.log(searchText);
    searchVideos(searchText).execute(response => {
      const videos = response.items;
      this.setState({
        lastSearchResult: videos
      });
    });
  };

  onVideoPlayed = () => {
    this.currentVideoPlaying = true;
  };

  updateCurrentVideo = videoId => {
    const videoURL = `https://www.youtube.com/embed/${videoId}`;
    this.setState({
      currentVideo: videoURL
    });
  };

  render() {
    const {
      currentVideo,
      youtubeApiLoaded,
      autoPlayVideo,
      disableSearchBar,
      lastSearchResult
    } = this.state;
    return (
      <div>
        <MuiThemeProvider>
          <SearchBar
            disabled={disableSearchBar}
            onSearchInitiated={this.startSearching}
          />
          <Player
            source={currentVideo}
            youtubeApiLoaded={youtubeApiLoaded}
            autoPlayVideo={autoPlayVideo}
            onVideoPlayed={this.onVideoPlayed}
          />
          <SearchResults
            results={lastSearchResult}
            updateCurrentVideo={this.updateCurrentVideo}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
