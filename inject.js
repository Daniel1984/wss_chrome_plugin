(function wps() {
  window.wpsEnabled = false;

  var initialBackgroundColor;
  var initialCursor;

  function getPopupContainer() {
    const popupContainer = document.createElement('div');
    popupContainer.style.position = 'fixed';
    popupContainer.style.zIndex = '3000';
    popupContainer.style.top = '0';
    popupContainer.style.left = '0';
    popupContainer.style.right = '0';
    popupContainer.style.bottom = '0';
    popupContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    return popupContainer;
  }

  function getPopup() {
    const popup = document.createElement('div');
    popup.style.minWidth = '500px';
    popup.style.minHeight = '300px';
    popup.style.backgroundColor = '#fff';
    popup.style.position = 'absolute';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    return popup;
  }

  function getButton({ state, cb, text }) {
    const button = document.createElement('button');
    button.style.minWidth = '500px';
    button.style.minHeight = '300px';
    button.style.backgroundColor = '#fff';
    button.style.position = 'absolute';
    button.style.top = '50%';
    button.style.left = '50%';
    button.style.transform = 'translate(-50%, -50%)';
    return button;
  }

  document.querySelectorAll('body *').forEach((el) => {
    el.addEventListener('mouseover', (e) => {
      if (!window.wpsEnabled) {
        return true;
      }

      e.preventDefault();
      e.stopPropagation();

      const elStyles = window.getComputedStyle(e.target);
      initialBackgroundColor = elStyles.backgroundColor;
      initialCursor = elStyles.cursor;
      e.target.style.backgroundColor = 'rgba(255, 100, 50, .3)';
      e.target.style.cursor = 'pointer';
    });

    el.addEventListener('mouseout', (e) => {
      if (!window.wpsEnabled) {
        return true;
      }

      e.target.style.backgroundColor = initialBackgroundColor;
      e.target.style.cursor = initialCursor;
    });

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

    el.addEventListener('click', (e) => {
      if (!window.wpsEnabled) {
        return true;
      }

      e.preventDefault();
      e.stopPropagation();

      const path = getPath(e.currentTarget, []).join(' > ');
      const el = document.querySelector(path);

      const fieldInfo = {
        path,
        name: 'testName',
        textContent: el.textContent,
        innerHTML: el.innerHTML,
        innerText: el.innerText,
      };

      // const popupContainer = getPopupContainer();
      // const popup = getPopup();

      // popupContainer.appendChild(popup);
      // document.body.appendChild(popupContainer);
      // document.body.appendChild(popup);

      chrome.extension.sendMessage({ fn: 'persistFieldInfo', payload: fieldInfo });
    });
  });
})();

