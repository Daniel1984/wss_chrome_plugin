document.addEventListener('DOMContentLoaded', () => {
  console.log('popup DOMContentLoaded');

  chrome.runtime.getBackgroundPage((bg) => {
    console.log('popup ', bg.haha, new Date());
  });

  const btnEnable = document.querySelector('.btn-enable');
  btnEnable.addEventListener('click', () => {
    chrome.runtime.sendMessage({ fn: 'enableScrapeSelections' }, (response) => {
      console.log('+=================>> enableScrapeSelections ', response);
    });
  });

  const btnDisable = document.querySelector('.btn-disable');
  btnDisable.addEventListener('click', () => {
    chrome.runtime.sendMessage({ fn: 'disableScraper' }, (response) => {
      console.log('+=================>> reloadTab ', response);
    });
  });
});
