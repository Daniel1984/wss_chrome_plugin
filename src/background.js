const injectedTabs = {};

function handleExtensionClick(tab) {
  const backgroundApp = {
    hideWPS() {
      injectedTabs[tab.id].visible = false;
    },
  };

  if (!injectedTabs[tab.id]) {
    chrome.tabs.executeScript(tab.ib, { file: 'inject.js' });
    injectedTabs[tab.id] = { injected: true, visible: true };
  } else if (injectedTabs[tab.id] && !injectedTabs[tab.id].visible) {
    injectedTabs[tab.id].visible = true;
    chrome.tabs.executeScript(tab.ib, { code: 'window.wspWebScrapeProvider.showUi()' });
  } else {
    injectedTabs[tab.id].visible = false;
    chrome.tabs.executeScript(tab.ib, { code: 'window.wspWebScrapeProvider.hideUi()' });
  }

  function listenToOutsideMessages(request, sender, sendResponse) {
    if (request.fn in backgroundApp) {
      chrome.runtime.onMessage.removeListener(listenToOutsideMessages);
      backgroundApp[request.fn](request.payload || {});
    }
  }

  chrome.runtime.onMessage.addListener(listenToOutsideMessages);
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading' && tab.active) {
    chrome.browserAction.onClicked.addListener(handleExtensionClick);
  }
});
