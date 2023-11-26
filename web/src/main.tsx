import React from 'react';
import ReactDOM from 'react-dom/client';

import SetupContext from './components/SetupContext';
import App from './pages/GraphEditor';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SetupContext>
      <App />
    </SetupContext>
  </React.StrictMode>,
);
