import Navbar from './components/Navbar';
import MainPage from './pages/MainPage';

function App() {
  return (
    <div className="h-screen bg-gradient-to-r from-tc3 via-tc4 to-tc3 font-nunito">
      <Navbar />
      <MainPage />
    </div>
  );
}

export default App;