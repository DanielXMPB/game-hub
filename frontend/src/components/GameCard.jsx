import { useNavigate } from 'react-router-dom';

export default function GameCard({ game }) {
  const formattedPositive = game.positive?.toLocaleString();
  const formattedPrice = game.price?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const navigate = useNavigate();

  const goToData = () => {
    navigate(`/game/${game._id}`);
  };

  return (
    <div className="w-full">
      <a className="flex items-center m-1 border rounded-lg flex-row border-gray-700 bg-blue-950">
        <img className="object-cover h-auto w-85 rounded-s-lg" src={game.header_image} />
        <div className="flex flex-col justify-between p-3 leading-normal w-[45%]">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-white">{game.name}</h5>
          <p className="mb-3 text-sm text-gray-400">{game.short_description}</p>
        </div>
        <div className="flex flex-row justify-between p-4 leading-normal space-x-8">
          <div className="text-center">
            <p className="mb-3 text-sm text-gray-400">Positive Reviews:</p>
            <p className="mb-3 text-sm text-gray-400">{formattedPositive}</p>
          </div>
          <button className="bg-green-700 p-3 w-32 font-normal text-white rounded-md text-center
          border border-gray-600 hover:bg-green-600"
          onClick={goToData}>
            {game.price === 0 ? 'Free' : 'Price: $' + formattedPrice}
          </button>
        </div>
      </a>
    </div>
  );
}