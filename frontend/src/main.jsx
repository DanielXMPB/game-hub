import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import GameData from './pages/GameData.jsx'
import GameList from './pages/GameList.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/list" element={<GameList />} />
      <Route path="/game/:id" element={<GameData />} />
    </Routes>
  </BrowserRouter>
);
