import LogInForm from '../features/login-form/LogInForm'

function LogIn() {
  return (
    <div className='flex flex-col justify-center items-center mt-4'>
      <div className='md:w-1/2 p-5'>
      <h3 className="text-siya-principal text-3xl m-2 mb-5 font-bold text-center">Siya eleva el teu terraceo ;)</h3>
      <p className='text-center mb-5'>Benvingut de nou</p>
        <LogInForm />
      </div>
    </div>
  )
}

export default LogIn;