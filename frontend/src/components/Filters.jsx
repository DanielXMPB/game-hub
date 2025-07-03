import { useState } from 'react';

export default function Filters({ onFilter }) {
  const [name, setName] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ name, minPrice, maxPrice });
  };

  return (
    <div className="w-2/10 h-full p-5 m-1 border-gray-700 rounded-2xl bg-blue-950">
      <form className="" onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <label className="peer-focus:font-medium text-lg text-gray-300 top-3 -z-10 origin-[0]">Name</label>
          <input className="block py-2.5 px-0 w-full text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={name} onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <label className="peer-focus:font-medium text-lg text-gray-300 top-3 -z-10 origin-[0]">Min Price</label>
            <input className="block py-2.5 px-0 w-full text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)}
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label className="peer-focus:font-medium text-lg text-gray-300 top-3 -z-10 origin-[0]">Max Price</label>
            <input className="block py-2.5 px-0 w-full text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-lg w-full lg:w-auto px-5 py-2.5 text-center">Search</button>
      </form>
    </div>
  );
}