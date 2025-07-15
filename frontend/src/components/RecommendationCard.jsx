export function RecommendationCard({ name, price, image }) {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col bg-blue-800">
            <img className="w-[300px]" src={image}/>
            <div className="px-6 py-2 mt-auto flex flex-col items-end">
                <div className="font-bold text-md mb-0.5 text-white">{name}</div>
                <div className="text-md mb-0.5 text-white">${price === 0 ? 'Free' : ' $' + price}</div>
            </div>
        </div>
    );
}