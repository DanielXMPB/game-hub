import { useState } from 'react';
import CustomCheckbox from './ui/CheckSystem.jsx';

export default function Filters({ onFilter, genres, categories, tags }) {
  const [name, setName] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [windows, setWindows] = useState(false);
  const [mac, setMac] = useState(false);
  const [linux, setLinux] = useState(false);
  const [genre, setGenre] = useState('');
  const [category, setCategory] = useState('');
  const [tag, setTag] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const filters = {};

    if (name) filters.name = name;
    if (minPrice) filters.minPrice = minPrice;
    if (maxPrice) filters.maxPrice = maxPrice;
    if (windows) filters.windows = true;
    if (mac) filters.mac = true;
    if (linux) filters.linux = true;
    if (genre) filters.genres = genre;
    if (category) filters.categories = category;
    if (tag) filters.tags = tag;

    onFilter(filters);
  };

  return (
    <div className="w-2/10 h-full p-5 mx-2 my-1 bg-tc2 rounded-2xl shadow-xl">
      <form className="" onSubmit={handleSubmit}>
        <div className="w-full max-w-sm min-w-[200px] mb-4">
          <label className="text-lg text-blue-100 font-bold">Name</label>
          <input className="mt-2 w-full bg-transparent text-blue-100 text-base border border-gray-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            value={name} onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <label className="text-lg text-blue-100 font-bold">Min Price</label>
            <input className="mt-2 w-full bg-transparent text-blue-100 text-base border border-gray-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)}
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label className="text-lg text-blue-100 font-bold">Max Price</label>
            <input className="mt-2 w-full bg-transparent text-blue-100 text-base border border-gray-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
        <label className="text-lg text-blue-100 font-bold">Systems</label>
        <div className="flex my-4 space-x-3">
          <CustomCheckbox checked={windows} onChange={(e) => setWindows(e.target.checked)} label="Windows" />
          <CustomCheckbox checked={linux} onChange={(e) => setLinux(e.target.checked)} label="Linux" />
        </div>
        <CustomCheckbox checked={mac} onChange={(e) => setMac(e.target.checked)} label="Mac" />
        <div className='flex flex-col my-4'>
          <div className="w-full max-w-sm min-w-[200px] mb-4">
            <label className="text-lg text-blue-100 font-bold">Genres</label>
            {genres !== null ? (
              <div className="mt-2 w-full bg-tc3 text-blue-100 text-base border border-gray-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 shadow-sm focus:shadow">
                {genres}
              </div>
            ) : (
              <input className="mt-2 w-full bg-transparent text-blue-100 text-base border border-gray-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                value={genre} onChange={e => setGenre(e.target.value)}
              />
            )}
          </div>
          <div className="w-full max-w-sm min-w-[200px] mb-4">
            <label className="text-lg text-blue-100 font-bold">Categories</label>
            {categories !== null ? (
              <div className="mt-2 w-full bg-tc3 text-blue-100 text-base border border-gray-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 shadow-sm focus:shadow">
                {categories}
              </div>
            ) : (
              <input className="mt-2 w-full bg-transparent text-blue-100 text-base border border-gray-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                value={category} onChange={e => setCategory(e.target.value)}
              />
            )}
          </div>
          <div className="w-full max-w-sm min-w-[200px] mb-4">
            <label className="text-lg text-blue-100 font-bold">Tags</label>
            {tags !== null ? (
              <div className="mt-2 w-full bg-tc3 text-blue-100 text-base border border-gray-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 shadow-sm focus:shadow">
                {tags}
              </div>
            ) : (
              <input className="mt-2 w-full bg-transparent text-blue-100 text-base border border-gray-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                value={tag} onChange={e => setTag(e.target.value)}
              />
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <div className="w-full flex justify-end mt-3">
            <button
              type="button"
              onClick={() => window.location.href = '/list'}
              className="text-white bg-red-800 border-1 border-gray-400 hover:bg-red-700 font-medium rounded-lg text-lg w-full lg:w-auto px-5 py-2.5 text-center"
            >
              Reset
            </button>
          </div>
          <div className="w-full flex justify-end mt-3">
            <button type="submit" className="text-white bg-tc3 border-1 border-gray-400 hover:bg-tc4 font-medium rounded-lg text-lg w-full lg:w-auto px-5 py-2.5 text-center">Search</button>
          </div>
        </div>
      </form>
    </div>
  );
}