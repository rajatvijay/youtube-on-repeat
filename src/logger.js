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
  nameSpaces[nameSpace.name] = turnOnNameSpace;
}

function log(nameSpace, ...content) {
  if (nameSpaces[nameSpace.name]) {
    console.log(...content);
  }
}

const iframeAPILogger = createNameSpace("ifram api");
iframeAPILogger.changeNameSpaceState("off");

const searchAPILogger = createNameSpace("search api");

export default {
  iframeAPILogger,
  searchAPILogger
};
