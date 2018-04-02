import React from 'react';
import { render } from 'react-dom';
import App from './components/App/App';

window.wspWebScrapeProvider = (function wsp() {
  window.wpsEnabled = false;

  function addCustomStyle() {
    const css = '[data-wsp="wspTarget"]:hover { background: rgba(255, 100, 50, .3); cursor: pointer; }';
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');

    style.type = 'text/css';

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
  }

  function renderUI() {
    const appContainer = document.createElement('div');
    appContainer.className = 'wsp-container';
    render(<App wsp={window.wspWebScrapeProvider} />, appContainer);
    document.body.appendChild(appContainer);
  }

  function initiateScrapingUi() {
    const appContainer = document.querySelector('.wsp-container');

    if (appContainer) {
      return;
    }

    addCustomStyle();
    renderUI();
  }

  function hideUi() {
    const appContainer = document.querySelector('.wsp-container');
    if (appContainer) {
      appContainer.style.display = 'none';
    }
  }

  function showUi() {
    const appContainer = document.querySelector('.wsp-container');
    if (appContainer) {
      appContainer.style.display = 'block';
    }
  }

  return {
    init: initiateScrapingUi,
    disableSelection() {
      window.wpsEnabled = false;
    },
    enableSelection() {
      window.wpsEnabled = true;
    },
    hideUi,
    showUi,
  };
}());

window.wspWebScrapeProvider.init();
