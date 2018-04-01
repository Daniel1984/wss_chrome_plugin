import { Container } from 'unstated';

function getAbsolutePath(el, path) {
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
    return getAbsolutePath(el.parentElement, path);
  }

  return path;
}

export default class ContentManagement extends Container {
  state = {
    selectedElements: [],
  };

  attachEventHandlers = () => {
    const setElementInState = (fieldInfo) => {
      console.log(fieldInfo);
      this.setState({
        selectedElements: [...this.state.selectedElements, fieldInfo],
      });
    };

    document.querySelectorAll('body *').forEach((el) => {
      if (el.classList.contains('wsp')) {
        return true;
      }

      el.addEventListener('mouseover', (e) => {
        if (!window.wpsEnabled) {
          return true;
        }

        e.preventDefault();
        e.stopPropagation();

        const { currentTarget } = e;

        currentTarget.setAttribute('data-wsp', 'wspTarget');

        function highlightElement() {
          currentTarget.removeAttribute('data-wsp');
          currentTarget.removeEventListener('mouseout', highlightElement);
          currentTarget.removeEventListener('click', storeElementInfo);
        }

        function storeElementInfo(e) {
          e.preventDefault();
          e.stopPropagation();

          const path = getAbsolutePath(currentTarget, []).join(' > ');

          const fieldInfo = {
            path,
            name: 'testName',
            textContent: currentTarget.textContent,
            innerHTML: currentTarget.innerHTML,
            innerText: currentTarget.innerText,
          };

          setElementInState(fieldInfo);
        }

        currentTarget.addEventListener('mouseout', highlightElement);
        currentTarget.addEventListener('click', storeElementInfo);
        return true;
      });

      return true;
    });
  }
}
