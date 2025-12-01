import SignUpForm from '../features/signup-form/SignUpForm'

function SignUp() {
  return (
    <div className='flex flex-col justify-center items-center mt-4'>
          <h3 className="text-siya-principal text-3xl m-2 mb-5 font-bold text-left">Siya eleva el teu terraceo ;)</h3>
          <p>Registra't per obtenir tots els beneficis!</p>
      <div className='w-2/3 shadow-lg p-5'>
        <SignUpForm />
      </div>
    </div>
  )
}

export default SignUp