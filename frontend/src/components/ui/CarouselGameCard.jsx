import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export function CarouselGameCard({ id }) {

    const [game, setGame] = useState(null);

    useEffect(() => {
        axios.get(`${API_URL}/getData`, { params: { id } })
            .then(res => { setGame(res.data); })
            .catch(err => console.error('Error loading game:', err));
    }, [id]);

    const [hoveredIdx, setHoveredIdx] = useState(null);

    return (
        <div className="min-h-[50svh] w-[1135px] mx-auto relative">
            {game && (
                <div className='flex flex-row bg-tc2 shadow-xl'>
                    <img
                        src={
                            hoveredIdx !== null
                                ? game.screenshots[hoveredIdx]
                                : game.header_image
                        }
                        alt={`Game ${game.name}`}
                        className="w-175 h-108 inset-0 text-neutral-300 shadow-xl transition-all duration-300"
                    />
                    <div className='flex flex-col'>
                        <h3 className='text-tc6 text-2xl font-bold my-4 ml-4'>{game.name}</h3>
                        <div className='grid grid-cols-2 grid-rows-2 gap-1 justify-center items-center mx-2'>
                            {game.screenshots.slice(0, 4).map((src, idx) => (
                                <img
                                    key={idx}
                                    className={`h-[150px] w-[250px] object-cover rounded-lg shadow-lg transition-all duration-300 ${hoveredIdx === idx ? 'scale-110 z-10' : ''}`}
                                    src={src}
                                    alt={`Game Screenshot ${idx + 1}`}
                                    onMouseEnter={() => setHoveredIdx(idx)}
                                    onMouseLeave={() => setHoveredIdx(null)}
                                    style={{ cursor: 'pointer' }}
                                />
                            ))}
                        </div>
                        <h3 className='text-tc6 text-2xl font-bold my-4 ml-4'>{game.price === 0 ? 'Free' : 'US$ ' + game.price}</h3>
                    </div>
                </div>
            )}
        </div>
    );
}
