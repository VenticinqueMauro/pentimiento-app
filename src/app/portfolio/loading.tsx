
export default function LoadingPortfolio() {
    return (
        <div >
            <div className="flex justify-center space-x-4 m-8">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="w-[90px] h-[36px] bg-gray-200 rounded mb-2 animate-puls"></div>
                ))}
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(400px,_1fr))] gap-2">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center justify-center bg-gray-200 animate-pulse">
                        <div className="w-full h-48"></div>
                        <div className="w-3/4 h-6"></div>
                        <div className="w-1/2 h-4"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}