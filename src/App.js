import React, { useState } from 'react';

import Loading from './Loading';
import Blog from './Blog';


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
        <Blog />
      );
}
}

export default App;
