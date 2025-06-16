import ScrollSnap from "./slider/ScrollSnap";
import { getBlobs } from "../services/blobList.service";

type BlobType = 'cover' | 'dietary' | 'emotional' | 'food' | 'placement'; // Add valid keys for blobs

export function BlobCarousel({ type }: { type: BlobType }) {

    const blobs: Record<BlobType, Record<string, string>> = getBlobs(); // Explicitly type blobs

    return (
        <ScrollSnap>
            {Object.entries(blobs[type]).map(([name, src]) => (
                <div key={name} className="snap-start shrink-0 w-[150px]">
                    <img src={src} alt={name} className="w-full" />
                </div>
            ))}
        </ScrollSnap>
    );
}