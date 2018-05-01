// Private
let nameSpaces = {};

function createNameSpace(nameSpace) {
  nameSpaces[nameSpace] = true;
  return {
    name: nameSpace,
    changeNameSpaceState: function(state) {
      changeNameSpaceState(nameSpace, state);
    },
    log: function(...content) {
      log(nameSpace, ...content);
    }
  };
}

function changeNameSpaceState(nameSpace, state) {
  let turnOnNameSpace = state === "on";
  nameSpaces[nameSpace] = turnOnNameSpace;
}

function log(nameSpace, ...content) {
  if (nameSpaces[nameSpace]) {
    console.log(...content);
  }
}

const iframeAPILogger = createNameSpace("iframe api");
iframeAPILogger.changeNameSpaceState("on");

const searchAPILogger = createNameSpace("search api");
searchAPILogger.changeNameSpaceState("off");

export default {
  iframeAPILogger,
  searchAPILogger
};
