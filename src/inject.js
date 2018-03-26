// (function wps() {
//   window.wpsEnabled = false;

//   var initialBackgroundColor;
//   var initialCursor;

//   function getElWrapper() {
//     const el = document.createElement('div');
//     el.className = 'ho-ho-ho';
//     el.style.position = 'relative';
//     el.style.zIndex = '3000';
//     return el;
//   }

//   function getContentContainer() {
//     const el = document.createElement('div');
//     el.style.position = 'absolute';
//     el.style.border = '1px solid #c1c1c1';
//     el.style.minWidth = '300px';
//     el.style.display = 'flex';
//     el.style.flexDirection = 'column';
//     el.style.backgroundColor = 'whiteSmoke';
//     el.style.top = '0';
//     el.style.left = '0';
//     return el;
//   }

//   function getContent() {
//     const el = document.createElement('div');
//     el.style.backgroundColor = '#fff';
//     el.style.padding = '10px';
//     return el;
//   }

//   function getFooter() {
//     const el = document.createElement('div');
//     el.style.padding = '5px 10px';
//     el.style.display = 'flex';
//     el.style.justifyContent = 'flex-end';
//     el.style.alignItems = 'center';
//     return el;
//   }

//   function getButton({ type, text, cb }) {
//     const el = document.createElement('button');
//     el.innerText = text;
//     el.onclick = cb;
//     el.style.outline = 'none';
//     el.style.minWidth = '70px';
//     el.style.border = '0';
//     el.style.padding = '5px 10px';
//     el.style.cursor = 'pointer';
//     el.style.color = '#fff';

//     if (type === 'success') {
//       el.style.backgroundColor = '#15CD72';
//     } else if (type === 'danger') {
//       el.style.backgroundColor = 'orangered';
//     } else {
//       el.style.backgroundColor = 'transparent';
//       el.style.color = '#00f';
//     }

//     return el;
//   }

//   function getInput({ placeholder, value }) {
//     const el = document.createElement('input');
//     el.placeholder = placeholder;
//     el.value = value || null;
//     el.style.padding = '10px';
//     el.style.flex = '1';
//     el.style.border = '1px solid #e7e7e7';
//     el.style.width = '100%';
//     el.style.backgroundColor = '#fcfcfc';
//     el.style.color = '#676767';
//     el.style.fontSize = '15px';
//     return el;
//   }

//   document.querySelectorAll('body *').forEach((el) => {
//     el.addEventListener('mouseover', (e) => {
//       if (!window.wpsEnabled) {
//         return true;
//       }

//       e.preventDefault();
//       e.stopPropagation();

//       const elStyles = window.getComputedStyle(e.target);
//       initialBackgroundColor = elStyles.backgroundColor;
//       initialCursor = elStyles.cursor;
//       e.target.style.backgroundColor = 'rgba(255, 100, 50, .3)';
//       e.target.style.cursor = 'pointer';
//     });

//     el.addEventListener('mouseout', (e) => {
//       if (!window.wpsEnabled) {
//         return true;
//       }

//       e.target.style.backgroundColor = initialBackgroundColor;
//       e.target.style.cursor = initialCursor;
//     });

//     function getPath(el, path) {
//       path = path.length ? path : [];

//       const tagName = el.tagName.toLowerCase();
//       const elClass = el.className ? `.${Array.from(el.classList).join('.')}` : '';
//       const elId = el.id ? `#${el.id}` : '';
//       const selector = elId || elClass;

//       if (el.parentElement && el.parentElement.children.length) {
//         const elementIndex = Array.from(el.parentElement.children).indexOf(el);
//         path.unshift(`${tagName}${selector}:nth-child(${elementIndex + 1})`);
//       } else {
//         path.unshift(`${tagName}${selector}:nth-child(0)`);
//       }

//       if (el.parentElement.nodeName.toLowerCase() !== 'html') {
//         return getPath(el.parentElement, path);
//       }

//       return path;
//     }

//     el.addEventListener('click', (e) => {
//       if (!window.wpsEnabled) {
//         return true;
//       }

//       e.preventDefault();
//       e.stopPropagation();

//       const path = getPath(e.currentTarget, []).join(' > ');
//       const el = document.querySelector(path);

//       const fieldInfo = {
//         path,
//         name: 'testName',
//         textContent: el.textContent,
//         innerHTML: el.innerHTML,
//         innerText: el.innerText,
//       };

//       const wrapper = getElWrapper();
//       const contentContainer = getContentContainer();
//       const footer = getFooter();
//       const content = getContent();
//       const saveBtn = getButton({ type: 'success', text: 'Save', cb: () => console.log('saving') });
//       const cancelBtn = getButton({ text: 'Cancel', cb: cancelFieldEdit });
//       const nameInput = getInput({ placeholder: 'Enter memorable field name' })

//       content.appendChild(nameInput);
//       footer.appendChild(cancelBtn);
//       footer.appendChild(saveBtn);
//       contentContainer.appendChild(content);
//       contentContainer.appendChild(footer);
//       wrapper.appendChild(contentContainer);

//       el.parentNode.insertBefore(wrapper, el);

//       wrapper.appendChild(el);
//       window.wpsEnabled = false;
//       chrome.extension.sendMessage({ fn: 'persistFieldInfo', payload: fieldInfo });

//       function cancelFieldEdit(e) {
//         e.preventDefault();
//         e.stopPropagation();
//         wrapper.parentNode.appendChild(el);
//         wrapper.parentNode.appendChild(e.target);
//         window.wpsEnabled = true;
//       }
//     });
//   });
// })();

window.wspWebScrapeProvider = (function wsp() {
  var wpsEnabled = true;

  function addCustomStyle() {
    var css = '[data-wsp="wspTarget"]:hover { background: rgba(255, 100, 50, .3); cursor: pointer; }';
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');

    style.type = 'text/css';

    if (style.styleSheet){
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

          console.log(fieldInfo)
        }

        currentTarget.addEventListener('mouseout', highlightElement);
        currentTarget.addEventListener('click', storeElementInfo);
      });
    });
  }

  function renderUI() {

  }

  function initiateScrapingUi() {
    addCustomStyle();
    attachEventHandlers();
    renderUI();
  }

  return {
    init: initiateScrapingUi
  };
})();

window.wspWebScrapeProvider.init();
