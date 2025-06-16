// const BLOB_MAP = {
//     cover: [
//         'ceiling-blob.png',
//         'full-cover-blob.png',
//         'no-cover-blob.png',
//         'umbrella-blob.png'
//     ],
//     dietary: [
//         'glutenFree-blob.png',
//         'vegan-blob.png',
//         'veggie-blob.png'
//     ],
//     emotional: [
//         'cozy-blob.png', 'elegant-blob.png', 'family-friendly-blob.png',
//         'friends-blob.png', 'groups-blob.png', 'lgtbi-friendly-blob.png',
//         'lively-blob.png', 'petlovers-blob.png', 'relaxed-blob.png',
//         'romantic-blob.png', 'silent-blob.png', 'trendy-blob.png'
//     ],
//     food: [
//         'american-blob.png', 'asian-blob.png', 'breakfast-blob.png',
//         'brunch-blob.png', 'burger-blob.png', 'chicken-blob.png',
//         'chinese-blob.png', 'dailyMenu-blob.png', 'indian-blob.png',
//         'italian-blob.png', 'kebab-blob.png', 'latin-blob.png',
//         'mex-blob.png', 'middleEast-blob.png', 'peruvian-blob.png',
//         'pizza-blob.png', 'spanish-food.png', 'tapas-blob.png',
//         'thai-blob.png', 'viet-blob.png'
//     ],
//     placement: [
//         'nature-blob.png', 'park-blob.png', 'rooftop-blob.png',
//         'seaside-blob.png', 'square-blob.png', 'street-blob.png'
//     ]
// };

// export const BlobList = ({ category, className }: BlobListProps) => {
// return (
//     <>
//         {BLOB_CATEGORIES_LIST[category]?.map((blob) => (
//             <div
//                 key={blob}
//                 className={`snap-start shrink-0 w-[150px] mx-2 ${className}`}
//             >
//                 <div className="bg-white/10 rounded-3xl p-4 aspect-square flex items-center justify-center">
//                     <img
//                         src={`../assets/${category}-blobs/${blob}`}
//                         alt={blob.replace('-blob.png', '').replace(/-/g, ' ')}
//                         className="w-full h-full object-contain"
//                         loading="lazy"
//                     />
//                 </div>
//                 <p className="text-center mt-2 text-sm capitalize">
//                     {blob.replace('-blob.png', '').replace(/-/g, ' ')}
//                 </p>
//             </div>
//         ))}
//     </>
// );
// }
