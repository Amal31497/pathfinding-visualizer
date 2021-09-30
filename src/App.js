import './App.css';
import Navigation from "./components/Navigation";
import Grid from "./components/Grid";
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = "Pathfinding Visualizer"
  },[]);

  return (
    <div className="App">
      <Navigation />
      <Grid />
    </div>
  );
}

export default App;
