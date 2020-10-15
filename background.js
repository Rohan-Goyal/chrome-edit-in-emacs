chrome.runtime.onInstalled.addListener(function () {
  console.log("I have awoken.");
});

function connect() {
  var hostName = "com.rohan.emacsedit";
  port = chrome.runtime.connectNative(hostname);
}

function processURL(url) {
  if (url.includes("github") && url.includes("blob")) {
    url = url
      .replace("github.com", "raw.githubusercontent.com")
      .replace("blob/", "");
  }
  if (url.includes("gitlab") && url.includes("blob")) {
    url = url.replace("blob", "raw");
  }

  return url;
}

chrome.browserAction.onClicked.addListener(function (tab) {
  let URL = tab.url;
  url = processURL(URL);
  console.log(url);
    chrome.runtime.sendNativeMessage("com.rohan.emacsedit", { target: url });
});
