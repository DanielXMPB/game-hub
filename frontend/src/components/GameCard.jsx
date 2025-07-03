export default function GameCard({ game }) {
  return (
    <div className="w-full">
      <a className="flex items-center m-1 border rounded-lg flex-row border-gray-700 bg-blue-950">
        <img className="object-cover h-auto w-85 rounded-s-lg" src={game.header_image} />
        <div className="flex flex-col justify-between p-3 leading-normal w-5/10">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-white">{game.name}</h5>
          <p className="mb-3 text-sm text-gray-400">{game.short_description}</p>
        </div>
        <div className="flex flex-col justify-between p-4 leading-normal">
          <p className="mb-3 font-normal text-gray-400">Price: ${game.price}</p>
        </div>
      </a>
    </div>
  );
}