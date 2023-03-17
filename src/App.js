import React, { useState } from 'react';

import Loading from './Loading';
import OffCanvas from './OffCanvas';


const App = () => {
  const [state, setState] = useState('loading');

  window.onGoogleLibraryLoad = () => {
    console.log('onGoogleLibraryLoad');

    window.gapi.load('client', () => setState('api loaded'));
  };

  switch (state) {
    case 'loading':
      return (
        <Loading />
      );
    default:
      return (       
        <OffCanvas />
      );
}
}

export default App;
