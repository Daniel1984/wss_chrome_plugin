window.wpsEnabled = false;

let initialBackgroundColor;
let initialCursor;

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

    chrome.extension.sendMessage({ fn: 'persistFieldInfo', payload: fieldInfo }, () => {
      console.log("Something happened");
    });
  });
});
