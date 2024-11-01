
export default function SkeletonTable() {
    return (
        <div className="animate-pulse">
            <div className="flex flex-col items-start max-w-4xl">
                <div className="h-8 bg-gray-300 rounded mb-4 w-1/4"></div>
                <div className="h-8 bg-gray-300 rounded mb-4 w-1/6"></div>
            </div>
            <table className="w-full mt-20">
                <thead>
                    <tr>
                        {[...Array(8)].map((_, i) => (
                            <th key={i} className="py-2">
                                <div className="h-6 bg-gray-200 rounded w-full"></div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {[...Array(5)].map((_, i) => (
                        <tr key={i} className="border-b border-gray-200 ">
                            {[...Array(8)].map((_, j) => (
                                <td key={j} className="py-2">
                                    <div className="h-6 bg-gray-100 rounded w-full"></div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
