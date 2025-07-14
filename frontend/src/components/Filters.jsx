import { useState } from 'react';
import CustomCheckbox from './checkSystem.jsx';

export default function Filters({ onFilter }) {
  const [name, setName] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [windows, setWindows] = useState(false);
  const [mac, setMac] = useState(false);
  const [linux, setLinux] = useState(false);
  const [genre, setGenre] = useState('');

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

    onFilter(filters);
  };

  return (
    <div className="w-2/10 h-full p-5 mx-2 my-1 border-gray-700 rounded-2xl bg-blue-950">
      <form className="" onSubmit={handleSubmit}>
        <div className="w-full max-w-sm min-w-[200px] mb-4">
          <label className="text-lg text-gray-400 font-bold">Name</label>
          <input className="mt-2 w-full bg-transparent text-gray-400 text-base border border-gray-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            value={name} onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <label className="text-lg text-gray-400 font-bold">Min Price</label>
            <input className="mt-2 w-full bg-transparent text-gray-400 text-base border border-gray-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)}
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label className="text-lg text-gray-400 font-bold">Max Price</label>
            <input className="mt-2 w-full bg-transparent text-gray-400 text-base border border-gray-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
        <label className="text-lg text-gray-400 font-bold">Systems</label>
        <div className="flex my-4 space-x-3">
          <CustomCheckbox checked={windows} onChange={(e) => setWindows(e.target.checked)} label="Windows" />
          <CustomCheckbox checked={linux} onChange={(e) => setLinux(e.target.checked)} label="Linux" />
        </div>
        <CustomCheckbox checked={mac} onChange={(e) => setMac(e.target.checked)} label="Mac" />
        <div className='flex flex-col my-4'>
          <div className="w-full max-w-sm min-w-[200px]">
            <label className="text-lg text-gray-400 font-bold">Genres</label>
            <div className="relative my-2">
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full bg-transparent text-gray-400 text-base border border-gray-400 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md appearance-none cursor-pointer">
                <option value="" className="text-gray-700">Select genre</option>
                <option value="Action" className="text-gray-700">Action</option>
                <option value="RPG" className="text-gray-700">RPG</option>
                <option value="Adventure" className="text-gray-700">Adventure</option>
                <option value="Strategy" className="text-gray-700">Strategy</option>
                <option value="Simulation" className="text-gray-700">Simulation</option>
                <option value="Indie" className="text-gray-700">Indie</option>
              </select>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end mt-3">
          <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-lg w-full lg:w-auto px-5 py-2.5 text-center">Search</button>
        </div>
      </form>
    </div>
  );
}