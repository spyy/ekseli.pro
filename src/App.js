import React, { useState } from 'react';

import Blog from './Blog';
import Introduction from './Introduction';



function App() {
  const [screenState, setScreenState] = useState('blog');
  

  switch (screenState) {
    case 'dashboard':
      break;
    case 'blog':
    default:
      return (
        <Blog />
      );
  }
}

export default App;
