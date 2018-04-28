import logger from "./logger";

const { searchAPILogger } = logger;

// The client ID is obtained from the {{ Google Cloud Console }}
// at {{ https://cloud.google.com/console }}.
// If you run this code from a server other than http://localhost,
// you need to register your own client ID.
const OAUTH2_CLIENT_ID = "AIzaSyD5esjzZc-AlNmy5OU5_YatOlE4efDpj98";
const OAUTH2_SCOPES = ["https://www.googleapis.com/auth/youtube"];

export function initializeSearchAPI() {
  // Upon loading, the Google APIs JS client automatically invokes this callback.
  window["onClientLoad"] = function() {
    searchAPILogger.log("on cline load: loaded".toUpperCase());
    window["gapi"].auth.init(function() {
      window.setTimeout(checkAuth, 1);
    });
  };

  const script = document.createElement("script");
  script.src = "https://apis.google.com/js/client.js?onload=onClientLoad";
  script.async = 1;
  document.head.appendChild(script);
}

// Attempt the immediate OAuth 2.0 client flow as soon as the page loads.
// If the currently logged-in Google Account has previously authorized
// the client specified as the OAUTH2_CLIENT_ID, then the authorization
// succeeds with no user intervention. Otherwise, it fails and the
// user interface that prompts for authorization needs to display.
function checkAuth() {
  window["gapi"].auth.authorize(
    {
      client_id: OAUTH2_CLIENT_ID,
      scope: OAUTH2_SCOPES,
      immediate: true
    },
    handleAuthResult
  );
}

// Handle the result of a gapi.auth.authorize() call.
function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    loadAPIClientInterfaces();
  } else {
    searchAPILogger.log("YOUTUBE: AUTH FAILED".toUpperCase());
  }
}

// Load the client interfaces for the YouTube Analytics and Data APIs, which
// are required to use the Google APIs JS client. More info is available at
// https://developers.google.com/api-client-library/javascript/dev/dev_jscript#loading-the-client-library-and-the-api
function loadAPIClientInterfaces() {
  window["gapi"].client.load("youtube", "v3", function() {
    handleAPILoaded();
  });
}

function handleAPILoaded() {
  searchAPILogger.log("youtube: Api loaded".toUpperCase());
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
