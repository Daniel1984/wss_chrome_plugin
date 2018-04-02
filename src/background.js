const injectedTabs = {};

function handleExtensionClick(tab) {
  const backgroundApp = {
    hideWPS() {
      injectedTabs[tab.id].visible = false;
    },
  };

  if (injectedTabs[tab.id] && !injectedTabs[tab.id].visible) {
    chrome.tabs.executeScript(tab.ib, { code: 'window.wspWebScrapeProvider.showUi()' }, () => {
      injectedTabs[tab.id] = { injected: true, visible: true };
    });
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
    chrome.tabs.executeScript(tab.ib, { file: 'inject.js' }, () => {
      chrome.tabs.executeScript(tab.ib, { code: 'window.wspWebScrapeProvider.hideUi()' }, () => {
        injectedTabs[tab.id] = { injected: true, visible: false };
      });
    });
  }
});
