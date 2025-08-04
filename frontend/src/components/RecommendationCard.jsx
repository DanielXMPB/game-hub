export function RecommendationCard({ name, price, image }) {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col bg-tc2/70 border-1 border-tc6">
            <img className="w-[310px]" src={image} />
            <div className="px-6 py-2 mt-auto flex flex-col items-end">
                <div className="font-bold text-md mb-0.5 text-tc6">{name}</div>
                <div className="text-md mb-0.5 text-tc6">
                    {price === 0 ? 'Free' : ' $' + price}
                </div>
            </div>
        </div>
    );
}