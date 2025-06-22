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
          <h3 className='text-center'>Benvingut/da a Siya!</h3> 
          <br />
          <h3>En registrar-te i utilitzar aquesta aplicació, acceptes les següents condicions:</h3>
          <br />
          <p>- Per oferir-te serveis personalitzats, Siya utilitza la teva ubicació per mostrar terrasses i la previsió meteorològica.</p>
          <p>- Recordem que el consum d’alcohol no està recomanat per a menors de 18 anys. Et demanem que facis un ús responsable dels serveis relacionats amb el consum d’alcohol.</p>
          <p>- Les reserves de taula requereixen un pagament a través de Stripe. Si finalment vas al restaurant, aquesta quantitat es descomptarà del compte.</p>
          <p>- Siya no es fa responsable de possibles errors en la informació, ni dels serveis oferts pels propietaris de les terrasses.</p>
          <p>- Podem modificar aquestes condicions en qualsevol moment, informant als usuaris a través de l’aplicació.</p>
          <p>- Per qualsevol consulta, pots contactar-nos a siya.bcn.app[@]gmail.com</p>
          <br />
          <p className='text-center'>Gràcies per utilitzar Siya!</p>
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