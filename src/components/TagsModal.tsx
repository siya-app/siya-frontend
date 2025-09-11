import { CgClose } from "react-icons/cg";
import { getBlobs, BLOB_TRANSLATIONS } from "../services/blobList.service";

type TagsModalProps = {
    isOpen: boolean;
    onClose: () => void;
    tags: Record<string, string[]>;
};

export const TagsModal = ({ isOpen, onClose, tags }: TagsModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed min-h-full inset-0
        bg-black/40 backdrop-blur-xs flex items-center
        justify-center z-50">
            <div className="bg-white rounded-xl
            max-w-3xl w-full p-4
            relative m-5">
                <button onClick={onClose} className="absolute top-2 right-4 text-xl">
                    <CgClose className="inline-icon" />
                </button>

                <h2 className="text-xl font-bold">Etiquetes</h2>
                <div className="grid grid-cols-3 gap-2">
                    {Object.entries(tags).map(([category, values]) =>
                    category ? (
                        values.map((tag) => {
                            const blobs = getBlobs();
                            const blob = blobs[category as keyof BlobCollection]?.[tag];
                            const label =BLOB_TRANSLATIONS[category as keyof typeof BLOB_TRANSLATIONS]?.[tag] || tag;

                            return (
                                <div key={`${category}-${tag}`} className="flex flex-col items-center">
                                    <img src={blob} alt={label} className="w-20 h-20 object-contain" />
                                    <span className="text-sm text-center mt-2">{label}</span>
                                </div>
                            );
                        })
                    ) : <div> Qui no té tags, te cames"</div>
                    )}
                </div>
            </div>
        </div>
    );
};