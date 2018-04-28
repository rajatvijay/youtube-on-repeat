import logger from "./logger";
const { searchAPILogger, iframeAPILogger } = logger;

// The client ID is obtained from the {{ Google Cloud Console }}
// at {{ https://cloud.google.com/console }}.
// If you run this code from a server other than http://localhost,
// you need to register your own client ID.
export const OAUTH2_CLIENT_ID = "AIzaSyD5esjzZc-AlNmy5OU5_YatOlE4efDpj98";
// const OAUTH2_SCOPES = ["https://www.googleapis.com/auth/youtube"];

export function initializeSearchAPI() {
  const script = document.createElement("script");
  script.src = "https://apis.google.com/js/client.js?onload=onClientLoad";
  script.async = 1;
  document.head.appendChild(script);
}

export function initializeIframAPI() {
  iframeAPILogger.log("loading youtube API".toUpperCase());
  var tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  tag.async = 1;
  document.head.appendChild(tag);
}

// Get the search results
export function searchVideos(searchText) {
  var request = window["gapi"].client.youtube.search.list({
    q: searchText,
    part: "snippet"
  });

  searchAPILogger.log("passing request to the container".toUpperCase());
  return request;
}
