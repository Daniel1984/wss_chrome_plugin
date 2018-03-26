import './styles/index.scss';

document.addEventListener('DOMContentLoaded', () => {
  console.log('popup DOMContentLoaded');
  const btnEnable = document.querySelector('.btn-enable');
  const btnDisable = document.querySelector('.btn-disable');

  chrome.runtime.getBackgroundPage((bg) => {
    console.log('popup ', bg.haha, new Date());
  });

  btnEnable.addEventListener('click', () => {
    chrome.runtime.sendMessage({ fn: 'enableScrapeSelections' });
  });

  btnDisable.addEventListener('click', () => {
    chrome.runtime.sendMessage({ fn: 'disableScraper' });
  });
});
