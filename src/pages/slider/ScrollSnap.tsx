import React from 'react'

function ScrollSnap() {
    return (
        <div>
            <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory flex gap-4 px-4">
                <div className="snap-start shrink-0 w-[80%] sm:w-[45%] bg-yellow-300 h-40 rounded-xl">Item 1</div>
                <div className="snap-start shrink-0 w-[80%] sm:w-[45%] bg-red-300 h-40 rounded-xl">Item 2</div>
                <div className="snap-start shrink-0 w-[80%] sm:w-[45%] bg-blue-300 h-40 rounded-xl">Item 3</div>
                <div className="snap-start shrink-0 w-[80%] sm:w-[45%] bg-green-300 h-40 rounded-xl">Item 4</div>
            </div>
        </div>
    )
}

export default ScrollSnap