type SliderButtonProps = {
    onClick?: () => void,
    tagName?: string,
    id?: string,
    selectedTags: string[],
    customClass?: string
}

function SliderButton({
    onClick,
    tagName,
    id,
    selectedTags,
    customClass
}: SliderButtonProps) {

    const isSelected = selectedTags.includes(id);

    return (
        <button
            onClick={onClick}
            className={`
                ${customClass}
                text-xs text-center
                capitalize  rounded-xl
                p-1.5 shadow-md shadow-gray-600 m-3
                ${isSelected ? 'siya3-bg text-white' : 'siya2-bg siya3-text'}
                `}>
            {tagName}</button>
    )
}

export default SliderButton