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

    const applyFilters = (filter) => {
        window.location.href = `/list?${filter}`;
    };

    return (
        <div className='bg-gradient-to-r from-tc3 via-tc4 to-tc3 font-nunito min-h-screen'>
            <Navbar />
            <div className="max-w-screen-xl mx-auto py-2 mt-2">
                <h1 className="text-3xl text-tc6 font-bold mb-2">{game.name}</h1>
                <div className='flex'>
                    <ImageCarousel screenshots={game.screenshots} />
                    <div className="border-1 border-tc6 rounded-sm mt-2 bg-tc2/70 shadow-xl">
                        <img src={game.header_image} alt={game.name} className="mb-4 w-full rounded-t-sm" />
                        <div className='pl-2'>
                            <p className='text-tc6'><strong className='text-tc5'>Recommendations:</strong> {game.recommendations}</p>
                            <p className='text-tc6'>
                                <strong className='text-tc5'>Reviews:</strong> {totalReviews}{" "}
                                <span className="ml-2 text-green-400">
                                    ({positivePercent}%)
                                </span>
                            </p>
                            <p className='text-tc6'><strong className='text-tc5'>Release Date:</strong> {game.release_date}</p>
                            <p className='text-tc6'><strong className='text-tc5'>Developers:</strong> {game.developers}</p>
                            <p className='text-tc6'><strong className='text-tc5'>publishers:</strong> {game.publishers}</p>
                            <p className='text-tc6'><strong className='text-tc5'>Platforms:</strong></p>
                            <div className="text-tc6 flex items-center gap-2">
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
                            <p className='text-tc6 flex items-center gap-2'><strong className='text-tc5'>Genres:</strong></p>
                            <div className="flex flex-wrap gap-2 list-none p-0">
                                {game.genres.map((genre) => (
                                    <a onClick={() => applyFilters(`genres=${genre}`)} className="bg-tc2 m-0.5 p-0.5 rounded-md border-1 border-tc6 text-tc6 text-md hover:bg-tc3 cursor-pointer" key={genre} >{genre}</a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex w-full mb-4'>
                    <div className='w-7/10 p-2'>
                        <div className='text-tc6'>
                            {game.packages.map((pkg, index) => (
                                <div key={index}>
                                    <h3>{pkg.title}</h3>
                                    {pkg.subs.map((sub, subIndex) => (
                                        <div key={subIndex} className='border-1 border-tc6 rounded-sm p-2 my-2 mx-6 bg-tc2/70 shadow-xl'>
                                            <p className='text-xl'><strong>{sub.text}</strong></p>
                                            <p className='text-sm'>{sub.description}</p>
                                            <div className='justify-end flex mt-0.5'>
                                                <div className='text-green-400 border-1 border-tc6 rounded-sm p-2 mr-1 bg-tc2/80 w-fit'>
                                                    {sub.price === 0 ? 'Free' : ' $' + sub.price}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className='text-tc6 mt-5 mb-1 pb-1 border-b-1 border-tc6'><strong>About:</strong></div>
                        <p className='text-tc6 mt-2'>{game.about_the_game}</p>
                    </div>
                    <div className='w-3/10 p-1'>
                        {game.achievements !== 0 && (
                            <p className='text-tc6 mt-1'><strong className='text-tc2'>Achievements:</strong> {game.achievements}</p>
                        )}
                        <p className='text-tc6 mt-1'><strong className='text-tc2'>Categories:</strong></p>
                        <div className="flex flex-wrap gap-2 mt-2 list-none p-0">
                            {game.categories.map((tag, index) => (
                                <a onClick={() => applyFilters(`categories=${tag}`)} className="bg-tc2 m-0.5 p-0.5 rounded-md border-1 border-tc6 text-tc6 text-md hover:bg-tc3 cursor-pointer" key={index}>{tag}</a>
                            ))}
                        </div>
                        <p className='text-tc6 mt-1'><strong className='text-tc2'>Tags:</strong></p>
                        <div className="flex flex-wrap gap-2 mt-2 list-none p-0">
                            {tagNames.map((tag, index) => (
                                <a onClick={() => applyFilters(`tags=${tag}`)} className="bg-tc2 m-0.5 p-0.5 rounded-md border-1 border-tc6 text-tc6 text-md hover:bg-tc3 cursor-pointer" key={index}>{tag}</a>
                            ))}
                        </div>
                        <p className='text-tc6 mt-1'><strong className='text-tc2'>Languages:</strong></p>
                        <div className="flex flex-wrap gap-2 mt-2 list-none p-0">
                            {game.supported_languages.map((language, index) => (
                                <span className="bg-tc2 p-1 rounded-lg border-1 border-gray-400 text-gray-300 text-md" key={index}>{language}</span>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <p><strong className='text-tc6'>Recommendations:</strong></p>
                    <div className='flex gap-4 mt-2'>
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