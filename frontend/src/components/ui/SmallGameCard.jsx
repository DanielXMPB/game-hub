export function SmallGameCard({ id, name, price, image }) {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col bg-tc2/70 hover:bg-tc2 transition duration-300 ease-in-out cursor-pointer hover:"
            onClick={() => window.location.href = `/game/${id}`}>
            <img className="w-[310px] h-[136px]" src={image} />
            <div className="px-3 py-2 mt-1 flex flex-col items-end">
                <div className="w-[280px] font-bold mb-0.5 text-tc6">{name}</div>
                <div className="mb-0.5 text-tc6">
                    {price === 0 ? 'Free' : ' $' + price}
                </div>
            </div>
        </div>
    );
}