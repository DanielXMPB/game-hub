import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function GameDetail() {
    const { id } = useParams();
    const [game, setGame] = useState(null);

    useEffect(() => {
        axios.get(`${API_URL}/getData`, { params: { id } })
            .then(res => setGame(res.data))
            .catch(err => console.error('Error loading game:', err));
    }, [id]);

    if (!game) return <div>Loading...</div>;

    return (
        <div>
            <Navbar />
            <div className="max-w-screen-2xl mx-auto p-2">
                <h1 className="text-3xl font-bold">{game.name}</h1>
                <img src={game.header_image} alt={game.name} className="my-4 w-96" />
                <p className="mb-2"><strong>Price:</strong> ${game.price}</p>
                <p className="mb-2"><strong>About:</strong> {game.about_the_game}</p>
                <p><strong>Release Date:</strong> {game.release_date}</p>
                <p><strong>Genres:</strong> {game.genres?.join(', ')}</p>
                <p><strong>Platforms:</strong>
                    {game.systems?.includes('windows') && ' Windows'}
                    {game.systems?.includes('mac') && ' Mac'}
                    {game.systems?.includes('linux') && ' Linux'}
                </p>
            </div>
        </div>
    );
}