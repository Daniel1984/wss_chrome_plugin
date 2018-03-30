export default {
  root: {
    position: 'fixed',
    zIndex: 10000,
    top: '0',
    right: '0',
    left: '0',
    backgroundColor: '#fff',
  },
  navbar: {
    height: '50px',
    padding: '0 10px',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '18px !important',
    boxShadow: 'rgba(0, 0, 0, 0.2) 3px 3px 10px',
  },
  title: {
    fontWeight: '600',
    letterSpacing: '1px',
    color: '#000',
  },
  content: {
    transition: 'height .3s ease-in-out',
    overflowY: 'auto',
  },
  innerContent: {
    display: 'flex',
    padding: '20px',
  },
  ctaBtn: {
    padding: '0',
    margin: '0 5px',
    '-webkit-appearance': 'none',
    borderRadius: '4px',
    width: '30px',
    height: '30px',
    backgroundColor: '#fff',
    outline: 'none',
  },
  chevronIcon: {
    fontSize: '25px',
  },
  selectionIcon: {
    fontSize: '20px',
  },
};
