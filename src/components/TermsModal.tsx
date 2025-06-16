import React from 'react'

interface ModalProps {
  isOpen: boolean; 
  onClose: () => void; 
}

function TermsModal({ isOpen, onClose }: ModalProps) {
    if (!isOpen) return null;

  return (
    
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-auto relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Termes i condicions</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        
        <div className="py-4 max-h-96 overflow-y-auto text-gray-700 text-sm">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus id ab aut blanditiis. Autem consequatur optio deserunt et odio natus temporibus, voluptate velit officia facilis expedita. Quaerat atque aspernatur quos ab neque facere minima vel asperiores dolores enim quisquam exercitationem, dicta, alias perferendis reiciendis fugit sint voluptatibus quas dolorem, repudiandae debitis ratione. Architecto, alias? Earum, veniam, quae minus vel nemo, quidem repellat incidunt dignissimos harum facilis quibusdam neque obcaecati? Aliquam numquam quaerat sed, possimus cum veritatis harum. Et eum recusandae tempora? Qui suscipit mollitia saepe deleniti iste earum dignissimos facilis nam maiores a adipisci, enim quo numquam. Nemo, nobis atque.
        </div>

       
        <div className="pt-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-siya-dark-green text-siya-lemon-cream font-bold py-2 px-4 rounded"
          >
            Entesos
          </button>
        </div>
      </div>
    </div>
  );
}

export default TermsModal