import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { ImageCarousel } from '../components/ImageCarousel';
import { RecommendationCard } from '../components/RecommendationCard';
import { Window, MacOs, Linux } from '../assets/icons';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function GameData() {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/getData`, { params: { id } })
            .then(res => setGame(res.data))
            .catch(err => console.error('Error loading game:', err));
    }, [id]);

    const tagArray = game ? Object.entries(game.tags) : [];
    const tagNames = tagArray.map(([key]) => key);

    useEffect(() => {
        if (game && tagNames.length > 0) {
            axios.get(`${API_URL}/searchRecommendation`, {
                params: { tags: JSON.stringify(tagNames.slice(0, 3)), _id: game._id }
            })
                .then(res => setRecommendations(res.data.results))
                .catch(err => console.error('Error fetching recommendations:', err));
        }
        // eslint-disable-next-line
    }, [game]);

    if (!game) return <div>Loading...</div>;

    const totalReviews = game.positive + game.negative;
    const positivePercent = totalReviews === 0 ? 0 : Math.round((game.positive / totalReviews) * 100);

    return (
        <div className='bg-blue-900 min-h-screen'>
            <Navbar />
            <div className="max-w-screen-xl mx-auto py-2 mt-2">
                <h1 className="text-3xl text-white font-bold mb-2">{game.name}</h1>
                <div className='flex'>
                    <ImageCarousel screenshots={game.screenshots} />
                    <div>
                        <img src={game.header_image} alt={game.name} className="mt-2 mb-4 w-full" />
                        <p className='text-gray-400'><strong className='text-blue-500'>Recommendations:</strong> {game.recommendations}</p>
                        <p className='text-gray-400'>
                            <strong className='text-blue-500'>Reviews:</strong> {totalReviews}{" "}
                            <span className="ml-2 text-green-400">
                                ({positivePercent}%)
                            </span>
                        </p>
                        <p className='text-gray-400'><strong className='text-blue-500'>Release Date:</strong> {game.release_date}</p>
                        <p className='text-gray-400'><strong className='text-blue-500'>Developers:</strong> {game.developers}</p>
                        <p className='text-gray-400'><strong className='text-blue-500'>publishers:</strong> {game.publishers}</p>
                        <p className='text-gray-400'><strong className='text-blue-500'>Genres:</strong></p>
                        <div className="flex flex-wrap gap-2 list-none p-0">
                            {game.genres.map((genre) => (
                                <span className="bg-blue-500 m-0.5 p-0.5 rounded-md border-1 border-gray-400 text-gray-300 text-md" key={genre} >{genre}</span>
                            ))}
                        </div>
                        <p className='text-gray-400 flex items-center gap-2'><strong className='text-blue-500'>Platforms:</strong></p>
                        <div className="text-gray-400 flex items-center gap-2">
                            {game.systems?.includes('windows') && (
                                <Window className="inline w-6 h-6 m-1" title="Windows" />
                            )}
                            {game.systems?.includes('mac') && (
                                <MacOs className="inline w-6 h-6 m-1" title="MacOS" />
                            )}
                            {game.systems?.includes('linux') && (
                                <Linux className="inline w-6 h-6 m-1" title="Linux" />
                            )}
                        </div>
                    </div>
                </div>
                <div className='flex w-full mb-4'>
                    <div className='w-7/10 p-2'>
                        <div className='text-gray-400'>
                            <h2>Available Packages</h2>
                            {game.packages.map((pkg, index) => (
                                <div key={index} style={{ marginBottom: '1rem' }}>
                                    <h3>{pkg.title}</h3>
                                    {pkg.subs.map((sub, subIndex) => (
                                        <div key={subIndex} style={{ marginLeft: '1rem' }}>
                                            <p><strong>{sub.text}</strong></p>
                                            {sub.description && <p>{sub.description}</p>}
                                            <p>Price: ${sub.price}</p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className='text-gray-400 mt-1'><h2>About:</h2></div>
                        <p className='text-gray-400 mt-2'>{game.about_the_game}</p>
                    </div>
                    <div className='w-3/10 p-1'>
                        <p className='text-gray-400 mt-1'><strong className='text-blue-500'>Categories:</strong></p>
                        <div className="flex flex-wrap gap-2 mt-2 list-none p-0">
                            {game.categories.map((tag, index) => (
                                <span className="bg-blue-500 p-1 rounded-lg border-1 border-gray-400 text-gray-300 text-md" key={index}>{tag}</span>
                            ))}
                        </div>
                        <p className='text-gray-400 mt-1'><strong className='text-blue-500'>Tags:</strong></p>
                        <div className="flex flex-wrap gap-2 mt-2 list-none p-0">
                            {tagNames.map((tag, index) => (
                                <span className="bg-blue-500 p-1 rounded-lg border-1 border-gray-400 text-gray-300 text-md" key={index}>{tag}</span>
                            ))}
                        </div>
                        <p className='text-gray-400 mt-1'><strong className='text-blue-500'>Languages:</strong></p>
                        <div className="flex flex-wrap gap-2 mt-2 list-none p-0">
                            {game.supported_languages.map((language, index) => (
                                <span className="bg-blue-500 p-1 rounded-lg border-1 border-gray-400 text-gray-300 text-md" key={index}>{language}</span>
                            ))}
                        </div>
                        {game.achievements !== 0 && (
                            <p className='text-gray-400 mt-1'><strong className='text-blue-500'>Achievements:</strong> {game.achievements}</p>
                        )}
                    </div>
                </div>
                <div>
                    <p><strong className='text-blue-500'>Recommendations:</strong></p>
                    <div className='flex flex-wrap gap-4 mt-2'>
                        {recommendations.map((rec) => (
                            <RecommendationCard
                                key={rec._id}
                                name={rec.name}
                                price={rec.price}
                                image={rec.header_image}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}