import React from 'react';
import ReactDOM from 'react-dom/client'; // Update the import to include /client
import App from './App';
import './index.css';

const rootElement = document.getElementById('root'); // Get the root element
const root = ReactDOM.createRoot(rootElement); // Create a root using createRoot

const originalAddEventListener = EventTarget.prototype.addEventListener;

EventTarget.prototype.addEventListener = function (type, listener, options) {
  if (type === 'DOMNodeInserted') {
    return;
  }
  return originalAddEventListener.apply(this, arguments);
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
