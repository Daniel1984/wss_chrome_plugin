const data = {
  name: 'dan'
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const backgroundApp = {
    enableScrapeSelections() {
      chrome.tabs.executeScript(tab.ib, {
        code: 'window.wpsEnabled = true',
      });
    },

    persistFieldInfo(payload) {
      console.log('payload: ', payload);
    },

    disableScraper() {
      chrome.tabs.executeScript(tab.ib, {
        code: 'window.wpsEnabled = false',
      });
    }
  }

  if (changeInfo.status === 'loading' && tab.active) {
    chrome.tabs.executeScript(tab.ib, {
      file: 'inject.js',
    });

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.fn in backgroundApp) {
        backgroundApp[request.fn](request.payload || {});
      }
    });
  }
});
