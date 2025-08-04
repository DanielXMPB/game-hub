import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { useCallback } from 'react';
import axios from 'axios';
import GameCard from '../components/GameCard';
import Filters from '../components/Filters';

const API_URL = import.meta.env.VITE_API_URL;

export default function GameList() {
  const [searchParams] = useSearchParams();
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [totalPages, setTotalPages] = useState(1);

  const genres = searchParams.get('genres');
  const categories = searchParams.get('categories');
  const tags = searchParams.get('tags');

  const fetchGames = useCallback(async () => {
    try {
      const appliedFilters = { ...filters };
      appliedFilters.genres = genres;
      appliedFilters.categories = categories;
      appliedFilters.tags = tags;

      const params = { page, limit: 20, ...appliedFilters };
      const res = await axios.get(`${API_URL}/search`, { params });
      setGames(res.data.results);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Error fetching games', err);
    }
  }, [page, filters, genres, categories, tags]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  return (
    <div className='h-min-screen p-3'>
      <div className='max-w-screen-xl flex flex-col mx-auto'>
        <div className='flex'>
          <Filters onFilter={(f) => { setFilters(f); setPage(1); }} genres={genres} categories={categories} tags={tags} />
          <div className="w-8/10 h-198 overflow-y-auto scroll-bg-tc3">
            {games.map(game => <GameCard key={game._id} game={game} />)}
          </div>
        </div>
        <div className="text-gray-300 text-right space-x-3 mt-5 mr-5">
          <button className="text-white bg-tc3 border-1 border-gray-400 hover:bg-tc4 font-medium rounded-lg text-lg w-full lg:w-auto px-4 py-2 text-center"
            disabled={page === 1} onClick={() => setPage(p => p - 1)}>Back</button>
          <span>Page {page} of {totalPages}</span>
          <button className="text-white bg-tc3 border-1 border-gray-400 hover:bg-tc4 font-medium rounded-lg text-lg w-full lg:w-auto px-4 py-2 text-center"
            disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
}