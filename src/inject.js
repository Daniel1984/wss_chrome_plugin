import React from 'react';
import { render } from 'react-dom';
import InjectedContainer from './injectableComponents/InjectedContainer/InjectedContainer';

window.wspWebScrapeProvider = (function wsp() {
  let wpsEnabled = true;

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

  function getPath(el, path) {
    path = path.length ? path : [];

    const tagName = el.tagName.toLowerCase();
    const elClass = el.className ? `.${Array.from(el.classList).join('.')}` : '';
    const elId = el.id ? `#${el.id}` : '';
    const selector = elId || elClass;

    if (el.parentElement && el.parentElement.children.length) {
      const elementIndex = Array.from(el.parentElement.children).indexOf(el);
      path.unshift(`${tagName}${selector}:nth-child(${elementIndex + 1})`);
    } else {
      path.unshift(`${tagName}${selector}:nth-child(0)`);
    }

    if (el.parentElement.nodeName.toLowerCase() !== 'html') {
      return getPath(el.parentElement, path);
    }

    return path;
  }

  function attachEventHandlers() {
    document.querySelectorAll('body *').forEach((el) => {
      el.addEventListener('mouseover', (e) => {
        if (!wpsEnabled) {
          return true;
        }

        e.preventDefault();
        e.stopPropagation();

        const currentTarget = e.currentTarget;

        currentTarget.setAttribute('data-wsp', 'wspTarget');

        function highlightElement() {
          currentTarget.removeAttribute('data-wsp');
          currentTarget.removeEventListener('mouseout', highlightElement);
          currentTarget.removeEventListener('click', storeElementInfo);
        }

        function storeElementInfo(e) {
          e.preventDefault();
          e.stopPropagation();

          const path = getPath(currentTarget, []).join(' > ');

          const fieldInfo = {
            path,
            name: 'testName',
            textContent: currentTarget.textContent,
            innerHTML: currentTarget.innerHTML,
            innerText: currentTarget.innerText,
          };

          console.log(fieldInfo);
        }

        currentTarget.addEventListener('mouseout', highlightElement);
        currentTarget.addEventListener('click', storeElementInfo);
      });
    });
  }

  function renderUI() {
    const appContainer = document.createElement('div');
    render(<InjectedContainer wss={window.wspWebScrapeProvider} />, appContainer);
    document.body.appendChild(appContainer);
  }

  function initiateScrapingUi() {
    addCustomStyle();
    attachEventHandlers();
    /*
      we add our custom UI last so that it does not
      intersect with scraper logic that attaches to
      all body elements
    */
    renderUI();
  }

  return {
    init: initiateScrapingUi,
    pause() {
      wpsEnabled = false;
    },
    resume() {
      wpsEnabled = true;
    },
  };
}());

window.wspWebScrapeProvider.init();
