import GameList from './pages/GameList';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="h-screen bg-gradient-to-r from-tc3 via-tc4 to-tc3 font-nunito">
      <Navbar />
      <GameList />
    </div>
  );
}

export default App;