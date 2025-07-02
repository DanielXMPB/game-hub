import { useEffect, useState } from 'react';
import axios from 'axios';
import GameCard from '../components/GameCard';
import Filters from '../components/Filters';

const API_URL = import.meta.env.VITE_API_URL;

export default function GameList() {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [totalPages, setTotalPages] = useState(1);

  const fetchGames = async () => {
    try {
      const params = { page, limit: 5, ...filters };
      const res = await axios.get(`${API_URL}/search`, { params });
      setGames(res.data.results);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Error fetching games', err);
    }
  };

  useEffect(() => {
    fetchGames();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filters]);

  return (
    <div>
      <h1>Game Browser</h1>
      <Filters onFilter={(f) => { setFilters(f); setPage(1); }} />
      <div className="game-list">
        {games.map(game => <GameCard key={game._id} game={game} />)}
      </div>
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
}