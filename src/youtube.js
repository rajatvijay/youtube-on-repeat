import logger from "./logger";

const { searchAPILogger } = logger;

// The client ID is obtained from the {{ Google Cloud Console }}
// at {{ https://cloud.google.com/console }}.
// If you run this code from a server other than http://localhost,
// you need to register your own client ID.
const OAUTH2_CLIENT_ID = "AIzaSyD5esjzZc-AlNmy5OU5_YatOlE4efDpj98";
// const OAUTH2_SCOPES = ["https://www.googleapis.com/auth/youtube"];

export function initializeSearchAPI() {
  // Upon loading, the Google APIs JS client automatically invokes this callback.
  window["onClientLoad"] = function() {
    searchAPILogger.log("on clint called".toUpperCase());
    window["gapi"].client.load("youtube", "v3", onYouTubeApiLoad);
  };

  const script = document.createElement("script");
  script.src = "https://apis.google.com/js/client.js?onload=onClientLoad";
  script.async = 1;
  document.head.appendChild(script);
}

function onYouTubeApiLoad() {
  searchAPILogger.log("setting client api key".toUpperCase());
  window["gapi"].client.setApiKey(OAUTH2_CLIENT_ID);
}

// Get the search results
export function searchVideos(searchText) {
  var request = window["gapi"].client.youtube.search.list({
    q: searchText,
    part: "snippet"
  });

  searchAPILogger.log("youtube: calling search API");
  request.execute(function(response) {
    searchAPILogger.log(response);
  });
}
