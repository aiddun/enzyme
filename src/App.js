import React from 'react'
import logo from './logo.svg'
import './App.css'
import NavBar from './NavBar'
import Grapher from './Grapher'


function App() {
  const [searchTerm, setSearchTerm] = React.useState(null);
  
  return (
    <div className="App">
      <NavBar  searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Grapher searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
  );
}

export default App