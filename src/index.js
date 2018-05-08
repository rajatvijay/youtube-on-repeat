import React from 'react';
import {render} from 'react-dom';
import SearchBar from './components/searchBar';
import SearchResults from './components/searchResults';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card} from 'material-ui/Card';
import YRPlayer from 'youtube-repeat-player';

import {
  initializeSearchAPI,
  initializeIframAPI,
  searchVideos,
  OAUTH2_CLIENT_ID,
} from './youtube';
import logger from './logger';
import {css} from 'emotion';

const CardClass = css`
  padding: 2% 0 8px 0;
  width: 740px;
  margin: auto;
  margin-top: 8px;
`;

const titleClass = css`
  text-align: center;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 400;
  display: inline-block;
  background: #f92672;
  padding: 5px 15px;
  text-transform: uppercase;
  font-size: 42px;
`;

const ContainerClass = css`
  background-color: #21232d;
`;

const HeadingContainer = css`
  width: 100%;
  text-align: center;
`;

const PlayerClass = css`
  display: block;
  width: 720px;
  height: 360px;
  margin: auto;
`;
console.log(PlayerClass);

const DEFAULT_VIDEO = 'YuXLN23ZGQo';

// Logger
const {iframeAPILogger, searchAPILogger} = logger;

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
      // autoPlayVideo: false,
      disableSearchBar: true,
    };

    iframeAPILogger.log('creating on ready fun for iframe API'.toUpperCase());
    window['onYouTubeIframeAPIReady'] = e => {
      iframeAPILogger.log('iframe API loaded, setting it true'.toUpperCase());
      this.setState({
        youtubeApiLoaded: true,
      });
    };

    searchAPILogger.log('creating on ready fun for search API'.toUpperCase());
    window['onClientLoad'] = () => {
      searchAPILogger.log('first search api loaded'.toUpperCase());
      window['gapi'].client.load('youtube', 'v3', () => {
        searchAPILogger.log('setting client api key'.toUpperCase());
        window['gapi'].client.setApiKey(OAUTH2_CLIENT_ID);
        this.setState({
          disableSearchBar: false,
        });
      });
    };
  }

  startSearching = searchText => {
    searchAPILogger.log(searchText);
    searchVideos(searchText).execute(response => {
      const videos = response.items;
      this.setState({
        lastSearchResult: videos,
      });
    });
  };

  onVideoPlayed = () => {
    this.currentVideoPlaying = true;
  };

  updateCurrentVideo = videoId => {
    this.setState({
      currentVideo: videoId,
    });
  };

  render() {
    const {
      currentVideo,
      youtubeApiLoaded,
      disableSearchBar,
      lastSearchResult,
    } = this.state;
    return (
      <div className={ContainerClass}>
        <MuiThemeProvider>
          <div className={HeadingContainer}>
            <h1 className={titleClass}>Listen On Repeat</h1>
          </div>
          <Card className={CardClass}>
            <SearchBar
              disabled={disableSearchBar}
              onSearchInitiated={this.startSearching}
            />
            <YRPlayer
              className={PlayerClass}
              videoId={currentVideo}
              youtubeApiLoaded={youtubeApiLoaded}
              autoPlayVideo={this.currentVideoPlaying}
              onVideoPlayed={this.onVideoPlayed}
            />
          </Card>
          {lastSearchResult.length > 0 && (
            <Card className={CardClass}>
              <SearchResults
                results={lastSearchResult}
                updateCurrentVideo={this.updateCurrentVideo}
              />
            </Card>
          )}
        </MuiThemeProvider>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
