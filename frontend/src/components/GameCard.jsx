export default function GameCard({ game }) {
  return (
    <div className="card">
      <img src={game.header_image} alt={game.name} width="300" />
      <h3>{game.name}</h3>
      <p>Price: ${game.price}</p>
      <p>{game.short_description}</p>
    </div>
  );
}