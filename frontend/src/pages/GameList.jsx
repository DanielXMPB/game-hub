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
      const params = { page, limit: 20, ...filters };
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
    <div className='bg-blue-900 h-min-screen p-3'>
      <div className='max-w-screen-2xl flex mx-auto'>
        <Filters onFilter={(f) => { setFilters(f); setPage(1); }} />
        <div className="w-8/10 min-h-screen">
          {games.map(game => <GameCard key={game._id} game={game} />)}
        </div>
      </div>
      <div className="text-gray-300 text-right space-x-3 mt-5 mr-5">
        <button className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 font-medium rounded-lg text-lg w-full lg:w-auto px-4 py-2 text-center"
        disabled={page === 1} onClick={() => setPage(p => p - 1)}>Back</button>
        <span>Page {page} of {totalPages}</span>
        <button className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 font-medium rounded-lg text-lg w-full lg:w-auto px-4 py-2 text-center"
        disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
}