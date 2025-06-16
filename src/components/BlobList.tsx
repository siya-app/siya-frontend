import ScrollSnap from "./slider/ScrollSnap";
import { getBlobs } from "../services/blobList.service";
import { BLOB_TRANSLATIONS } from "../services/blobList.service";

type BlobType = 'cover' | 'dietary' | 'emotional' | 'food' | 'placement'; // Add valid keys for blobs

export function BlobCarousel({ type }: { type: BlobType }) {

    const blobs: Record<BlobType, Record<string, string>> = getBlobs(); // Explicitly type blobs
    const translations = BLOB_TRANSLATIONS[type];

    return (
        <ScrollSnap>
            {Object.entries(blobs[type]).map(([id, src]) => (
                <div key={id} className="snap-start shrink-0 w-[5em] mx-1"> {/* Reduced width and margin */}
                    <div className="flex flex-col items-center p-2"> {/* Added container for better alignment */}
                        <img 
                            src={src} 
                            alt={translations[id as keyof typeof translations]}
                            className="w-20 h-20 object-contain" // Fixed size and contain
                        />
                        <p className="text-xs text-center
                        capitalize siya2-bg rounded-xl siya3-text
                        p-1.5 shadow-md shadow-gray-600
                        "> {/* Added label */}
                        {translations[id as keyof typeof translations]}
                        </p>
                    </div>
                </div>
            ))}
        </ScrollSnap>
    );
}