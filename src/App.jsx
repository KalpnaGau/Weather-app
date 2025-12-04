import React from 'react';
import Home from './pages/Home';

function App() {
  // Dynamic background based on time of day could be handled here or in Home.
  // For simplicity, let's use a nice gradient that looks good generally, 
  // or we could pass a prop from Home if we lifted state up.
  // For now, a rich gradient background.

  return (
    <>
      <Home />
    </>
  );
}

export default App;
