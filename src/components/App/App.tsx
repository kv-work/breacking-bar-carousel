import React from 'react';
import { useSelector } from 'react-redux';

const App: React.FC = () => {
  const store = useSelector(store => store);
  console.log(store)
  
  return (<div className="app">The Breacking Bad</div>);
}

export default App;